var schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userBeenFollowed: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    flag: {
        type: String,
        default: false
    },
});

schema.plugin(deepPopulate, {
    Populate: {
        'news': {
            select: '_id name'
        },
        'user': {
            select: '_id name'
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('UserFollow', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "news user userBeenFollowed", "news user userBeenFollowed", "order", "asc"));
var model = {


    getOneUserDetail: function (userId, GetUserId, data, callback) {
        // console.log("Insde api get all user", userId, data.page)
        dataTosendToAPi = {}
        dataTosendToAPi.userId = userId
        dataTosendToAPi.GetUserId = GetUserId
        dataTosendToAPi.data = data
        async.waterfall([
            function (callback1) {
                User.findOne({
                    _id: GetUserId
                }).deepPopulate(" ").exec(function (err, found) {
                    if (err) {
                        callback1(err, null);
                    } else if (_.isEmpty(found)) {
                        callback1("noDataound", null);
                    } else {
                        if (dataTosendToAPi.userId == dataTosendToAPi.GetUserId) {
                    
                            found.flag = "Nuetral"
                            callback(null, found);
                        } else {
                            console.log("inside else")
                            callback1(null, found);
                        }

                    }

                });
            },
            function (datain, callback2) {
                UserFollow.find({
                    user: dataTosendToAPi.userId
                }).deepPopulate(" ").exec(function (err, found) {
                    if (err) {
                        callback2(err, null);
                    } else if (_.isEmpty(found)) {

                        callback2(null, datain);
                    } else {
                        async.each(found, function (userList, callback) {

                            if ((userList.userBeenFollowed.equals(datain._id))) {
                               
                                datain.flag = true


                            }
                        }, function (err) {

                            callback2(err, null);
                        })
                        callback2(null, datain);
                    }

                });
            },
        ], function (err, data) {
            if (err || _.isEmpty(data)) {

                callback(err, []);
            } else {

                callback(null, data);
            }

        });

    },

    getAllFollwersNameForInviteFrnd: function (userId, userFollower, data, callback) {
        // console.log("Insde api get all user", userId, userFollower)
        dataTosendToAPi = {}
        dataTosendToAPi.userId = userId
        dataTosendToAPi.data = data
        dataTosendToAPi.userFollower = userFollower
        async.waterfall([
            function (callback1) {
                // console.log("$$$$$$$$$$$$$$444", dataTosendToAPi.userId)
                UserFollow.find({
                        user: dataTosendToAPi.userId
                    })
                    .deepPopulate("user userBeenFollowed").exec(function (err, found) {
                        // console.log("***11111111111111111111111 saili****", found)
                        if (err) {
                            callback1(err, null);
                        } else if (_.isEmpty(found)) {
                            callback1(null, found);
                        } else {
                            // console.log("%%%%%%%%%%%%%%%%%",found)
                            callback1(null, found);
                        }

                    });
            },
            function (datain, callback2) {
                // console.log("Data is,datain***********************************", datain)
                if (data.count) {
                    var maxCount = data.count;
                } else {
                    var maxCount = Config.maxRow;
                }
                var maxRow = maxCount
                var page = 1;
                if (data.page) {
                    page = data.page;
                }
                var field = data.field;
                var options = {
                    field: data.field,
                    filters: {
                        keyword: {
                            fields: ['name'],
                            term: data.keyword
                        }
                    },
                    sort: {
                        name: 1
                    },
                    start: (page - 1) * maxRow,
                    count: maxRow
                };
                UserFollow.find({
                        userBeenFollowed: dataTosendToAPi.userFollower
                    })
                    .deepPopulate("user userBeenFollowed")
                    .order(options)
                    .keyword(options)
                    .page(options,
                        function (err, found) {
                            if (err) {
                                callback2(err, null);
                            } else if (found) {
                                // console.log("*****22222222222 kishori**********", found)
                                callback2(null, found, datain);
                            } else {

                                callback2("Invalid data", null);
                            }
                        });

            },
        ], function (err, data, data1) {
            // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%3333333333333 kishori", data)
            // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%3333333333333 saili", data1)
            if (err || _.isEmpty(data)) {
                callback(err, []);
            } else {
                if (_.isEmpty(data1)) {
                    // console.log("inside if")
                } else {
                    async.each(data.results, function (userInfo, callback) {
                        // console.log("userInfo************",userInfo)
                        async.each(data1, function (follow, callback) {

                            if (_.isEqual(userInfo.user._id, follow.userBeenFollowed._id)) {

                                userInfo.flag = true
                            } else {
                                if (userInfo.user._id == dataTosendToAPi.userId) {
                                    userInfo.flag = "Nuetral"
                                }
                            }
                        }, function (err) {

                            callback(null, data);
                        })





                    }, function (err) {
                        callback(null, data);
                    })
                }

                callback(null, data);
            }

        });

    },







    /**
     * this function for Get All user expect log in user
     * @param {userId} input password
     * @param {callback} callback function with err and response
     */
    getAllUser: function (userId, data, callback) {
        // console.log("Insde api get all user", userId, data.page)
        dataTosendToAPi = {}
        dataTosendToAPi.userId = userId
        dataTosendToAPi.data = data
        async.waterfall([
            function (callback1) {
                UserFollow.find({
                    user: userId
                }).deepPopulate(" ").exec(function (err, found) {
                    // console.log("found inside api 1st",found)
                    if (err) {
                        callback1(err, null);
                    } else if (_.isEmpty(found)) {
                        callback1(null, found);
                    } else {
                        callback1(null, found);
                    }

                });
            },
            function (datain, callback2) {
                // console.log("Data is,datain************************************", dataTosendToAPi.userId)
                if (data.count) {
                    var maxCount = data.count;
                } else {
                    var maxCount = Config.maxRow;
                }
                var maxRow = maxCount
                var page = 1;
                if (data.page) {
                    page = data.page;
                }
                var field = data.field;
                var options = {
                    field: data.field,
                    filters: {
                        keyword: {
                            fields: ['name'],
                            term: data.keyword
                        }
                    },
                    sort: {
                        name: 1
                    },
                    start: (page - 1) * maxRow,
                    count: maxRow
                };
                User.find({
                        _id: {
                            $ne: dataTosendToAPi.userId
                        }
                    })
                    .deepPopulate()
                    .order(options)
                    .keyword(options)
                    .page(options,
                        function (err, found) {
                            if (err) {
                                callback2(err, null);
                            } else if (found) {

                                callback2(null, found, datain);
                            } else {

                                callback2("Invalid data", null);
                            }
                        });

            },
        ], function (err, data, data1) {
            if (err || _.isEmpty(data)) {
                callback(err, []);
            } else {
                if (_.isEmpty(data1)) {
                    // console.log("inside if")
                } else {
                    async.each(data.results, function (userInfo, callback) {
                        async.each(data1, function (follow, callback) {

                            if (_.isEqual(userInfo._id, follow.userBeenFollowed)) {

                                userInfo.flag = true
                            } else {

                            }
                        }, function (err) {

                            callback(null, data);
                        })
                    }, function (err) {
                        callback(null, data);
                    })
                }

                callback(null, data);
            }

        });

    },


    getAllFollowingName: function (userId, data, callback) {

        if (data.count) {
            var maxCount = data.count;
        } else {
            var maxCount = Config.maxRow;
        }
        var maxRow = maxCount
        var page = 1;
        if (data.page) {
            page = data.page;
        }
        var field = data.field;
        var options = {
            field: data.field,
            filters: {
                keyword: {
                    fields: ['name'],
                    term: data.keyword
                }
            },
            sort: {
                createdAt: -1
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };
        UserFollow.find({
                user: userId
            }).deepPopulate("user userBeenFollowed")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    if (err) {
                        callback(err, null);
                    } else if (found) {
                        _.each(found.results, function (pp) {
                            _.each(pp.polls, function (pp1) {
                                var temp = _.find(pp.polls, function (o) {
                                    if (o.poll.user.status == "Deactive") {
                                        return o;
                                    }

                                });
                                if (temp === undefined) {} else {
                                    _.pull(pp.polls, temp)
                                }
                            })

                            _.each(pp.comments, function (pp2) {
                                var temp1 = _.find(pp.comments, function (r) {
                                    if (r.comment.user.status == "Deactive") {
                                        return r;
                                    }

                                });
                                if (temp1 === undefined) {} else {
                                    _.pull(pp.comments, temp1)
                                }
                            })
                        })
                        callback(null, found);
                    } else {
                        callback("Invalid data", null);
                    }
                });

    },



  getAllFollowingNameWithoutPaggination: function (userId, callback) {
        UserFollow.find({
            user: userId
        }).deepPopulate("user userBeenFollowed").exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback("noDataound", null);
            } else {
                callback(null, found);
            }

        });
    },

    getAllFollowerName: function (userId, callback) {
        UserFollow.find({
            userBeenFollowed: userId
        }).deepPopulate("user userBeenFollowed").exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback("noDataound", null);
            } else {
                callback(null, found);
            }

        });
    },







    /**
     * this function add Follow and Following Count for User
     * @param {userFollowed} input userFollowed
     *  * @param {userFollwing} input userFollwing
     * @param {callback} callback function with err and response
     */

    addFollowerCount: function (userFollowed, userFollwing, callback) {

        async.waterfall([
            function (callback1) {
                var dataToSave = {}
                dataToSave.user = userFollowed
                dataToSave.userBeenFollowed = userFollwing
                UserFollow.saveData(dataToSave, function (err, created) {
                    if (err) {
                        callback(err, null);
                    } else if (_.isEmpty(created)) {
                        callback(null, "noDataound");
                    } else {
                        userData = {}
                        userData.userFollowed = userFollowed;
                        userData.userFollwing = userFollwing;
                        callback1(null, userData);
                    }
                });
            },
            function (datain, callback2) {
                User.findOne({
                    _id: datain.userFollowed
                }).exec(function (err, found) {
                    if (err) {
                        callback2(err, null);
                    } else if (_.isEmpty(found)) {
                        callback2("noDataound", null);
                    } else {
                        var data2 = {}
                        data2._id = found._id;
                        data2.followingCount = found.followingCount + 1
                        User.saveData(data2, function (err, created) {
                            if (err) {
                                callback2(err, null);
                            } else if (_.isEmpty(created)) {
                                callback2(null, "noDataound");
                            } else {

                                callback2(null, datain);
                            }
                        });
                    }

                })

            },
            function (data, callback3) {
                User.findOne({
                    _id: data.userFollwing
                }).exec(function (err, found) {
                    if (err) {
                        callback3(err, null);
                    } else if (_.isEmpty(found)) {
                        callback3("noDataound", null);
                    } else {
                        var data2 = {}
                        data2._id = found._id;
                        data2.followCount = found.followCount + 1
                        User.saveData(data2, function (err, created) {
                            if (err) {
                                callback3(err, null);
                            } else if (_.isEmpty(created)) {
                                callback3(null, "noDataound");
                            } else {

                                callback3(null, created);
                            }
                        });
                    }

                });

            },
        ], function (err, data) {

            if (err || _.isEmpty(data)) {
                callback(err, []);
            } else {
                callback(null, data);
            }
        });
    },




    areBothFollowing: function (user, userBeenFollowed, callback) {
        // console.log("&&&&&&&&&&&&&&&&&&",user,userBeenFollowed)
        var Model = this;
        Model.find({
            user: user,
            userBeenFollowed: userBeenFollowed
        }).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback("noDataound", null);
            } else {
                callback(null, found);
            }

        });
    },


    /**
     * this function add Follow and Following Count for User
     * @param {userFollowed} input userFollowed
     *  * @param {userFollwing} input userFollwing
     * @param {callback} callback function with err and response
     */

    removeFollowerCount: function (userFollowed, userFollwing, callback) {
        async.waterfall([
            function (callback1) {
                UserFollow.findOne({
                    user: userFollowed,
                    userBeenFollowed: userFollwing
                }).deepPopulate('').exec(function (err, found) {
                    console.log("inside api found", found)
                    if (err) {
                        callback(err, null);
                    } else if (_.isEmpty(found)) {
                        callback("noDataound", null);
                    } else {
                        UserFollow.deleteData(found, function (err, created) {
                            if (err) {
                                callback1(err, null);
                            } else if (_.isEmpty(created)) {
                                callback1(null, "noDataound");
                            } else {
                                dataToSend = {}
                                dataToSend.userFollowed = userFollowed
                                dataToSend.userFollwing = userFollwing
                                callback1(null, dataToSend);
                            }
                        });
                    }

                })
            },
            function (datain, callback2) {
                User.findOne({
                    _id: datain.userFollowed
                }).exec(function (err, found) {
                    if (err) {
                        callback2(err, null);
                    } else if (_.isEmpty(found)) {
                        callback2("noDataound", null);
                    } else {
                        var data2 = {}
                        data2._id = found._id;
                        data2.followingCount = found.followingCount - 1
                        User.saveData(data2, function (err, created) {
                            if (err) {
                                callback2(err, null);
                            } else if (_.isEmpty(created)) {
                                callback2(null, "noDataound");
                            } else {

                                callback2(null, datain);
                            }
                        });
                    }

                })

            },
            function (data, callback3) {
                User.findOne({
                    _id: data.userFollwing
                }).exec(function (err, found) {
                    if (err) {
                        callback3(err, null);
                    } else if (_.isEmpty(found)) {
                        callback3("noDataound", null);
                    } else {
                        var data2 = {}
                        data2._id = found._id;
                        data2.followCount = found.followCount - 1
                        User.saveData(data2, function (err, created) {
                            if (err) {
                                callback3(err, null);
                            } else if (_.isEmpty(created)) {
                                callback3(null, "noDataound");
                            } else {

                                callback3(null, created);
                            }
                        });
                    }

                })

            },
        ], function (err, data) {

            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                callback(null, data)
            }
        });
    },

};
module.exports = _.assign(module.exports, exports, model);