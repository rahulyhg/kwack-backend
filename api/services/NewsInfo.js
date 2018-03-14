var schema = new Schema({
    name: {
        type: String,

    },
    description: {
        type: String,

    },
    flagForPoll: {
        type: Boolean,
        default: false
    },
    flagForKwack: {
        type: Boolean,
        default: false
    },
    flagForShare: {
        type: Boolean,
        default: false
    },
    url: {
        type: String,

    },
    imageUrl: {
        type: String,

    },
    source: {
        type: String,

    },
    sourceId: {
        type: String,

    },
    sourceJson: {
        type: String,

    },



    pollQuestion: {
        type: String,

    },
    pollQuestionOption: [String],
    interest: {
        type: String,

    },
        language: {
        type: String,

    },
    shareNewsCount: [{
        sharenews: {
            type: Schema.Types.ObjectId,
            ref: 'ShareNews'
        }
    }],
    realTotalCount: [{
        readcount: {
            type: Schema.Types.ObjectId,
            ref: 'Readlogs'
        }
    }],
    commentTotal: {
        type: Number,
        default: 0
    },
    comments: [{
        comment: {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            index: true
        }
    }],
    polls: [{
        poll: {
            type: Schema.Types.ObjectId,
            ref: 'PollAnswer',
            index: true
        }
    }],
    likeTotal: {
        type: Number,
        default: 0
    },
    Likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        index: true
    }],
    isSocial: {
        type: String,
        default: "NO",
        enum: ['YES', 'NO']
    },
    isExplore: {
        type: String,
        default: "NO",
        enum: ['YES', 'NO']
    },
    trending: {
        type: String,
        default: "NO",
        enum: ['YES', 'NO']
    },
    IsPoll: {
        type: String,
        default: "NO",
        enum: ['YES', 'NO']
    },
    IsKwack: {
        type: String,
        default: "NO",
        enum: ['YES', 'NO']
    },
    isDisable: {
        type: String,
        default: "NO",
        enum: ['YES', 'NO']
    },

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('NewsInfo', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "", "", "createdAt", "desc"));
var model = {

    //************INPUT FOR API */
    // {
    // "startDate":"2018-01-01",
    // "endDate":"2018-01-10",
    // "interest":["News"],
    // "kwack":"true"
    // }
    // demo: function (startDate, endDate,interest,kwack,poll,callback) {
    // var findObj = {
    // createdAt: {
    //     $gte: moment(startDate).startOf('day'),
    //     $lte: moment(endDate).endOf('day')
    // }
    //  };
    //      if(!_.isEmpty(interest)){
    //  findObj.interest={
    //       $in:interest 
    //     }
    //      }
    //      if(kwack){
    //          console.log("inside kwack")
    //          findObj.IsKwack = "YES";
    //      }
    //        if(poll){
    //          console.log("inside kwack")
    //          findObj.IsPoll = "YES";
    //      }
    //     NewsInfo.find(findObj,{interest:1,createdAt:1,IsKwack:1,IsPoll:1}).deepPopulate().lean().exec(function (err, found) {
    //         console.log("found***********",found)
    //         if (err) {
    //             callback(err, null);
    //         } else if (_.isEmpty(found)) {

    //             callback("noDataound", null);
    //         } else {
    //             console.log("found", found)
    //             callback(null, found);
    //         }

    //     });
    // },









    //INPUT for this api is 
    // {
    // "userId":"5a55b4c0c7bb192cd7f88255",
    // "kwacks":"true",
    // "startDate":"2018-01-01",
    // "endDate":"2020-01-10",
    // "interest":["News","Politics"]
    // }

    /**
     * this function is for Fillter the news
     * @param {startDate} input startDate
     * * @param {endDate} input endDate
     * * * @param {interest} input interest
     * * * * @param {userId} input userId
     *  * * * * @param {polls} input polls
     * *  * * * * @param {kwacks} input kwacks
     * @param {callback} callback function with err and response
     */
    IsPollKwackIf: function (startDate, endDate, interest, userId, polls, kwacks, data, callback) {
        console.log("$$$$$$$$$$$$$$$$$$$$$$4444", interest, startDate, endDate, polls, userId, kwacks)
        var filter = {};

        async.waterfall([
                function (callback1) {
                    var pollArr = [];
                    if (polls) {
                        PollAnswer.find({
                            user: userId,
                        }, {
                            news: 1
                        }).exec(function (err, found) {
                            // console.log("inside api found POLLLLLLLLLLLL", found)
                            // _.forEach(found, function (poll) {
                            //     pollArr.push(poll.news)
                            // })
                            if (err) {
                                callback1(err, null);
                            } else if (_.isEmpty(found)) {
                                pollArr = found;
                                if (kwacks) {
                                    callKwack();
                                } else {
                                    callback1("noDataound poll", null);
                                }

                            } else {
                                pollArr = found;
                                var dataToSend = {}
                                dataToSend.startDate = startDate;
                                dataToSend.endDate = endDate;
                                if (kwacks) {
                                    callKwack();
                                } else {
                                    // console.log("Call back is going fromm hereEEEEEEEEEEEEEEEEEEE", dataToSend)
                                    callback1(null, pollArr, dataToSend, interest);
                                }
                            }
                        })
                    } else {
                        callKwack();
                    }

                    function callKwack() {
                        // console.log("inside kwack")
                        if (kwacks) {
                            Comment.find({
                                user: userId,
                            }, {
                                news: 1
                            }).exec(function (err, found) {
                                var dataToSend = {}
                                dataToSend.startDate = startDate;
                                dataToSend.endDate = endDate;
                                // console.log("inside api found", found)
                                if (err) {
                                    callback1(err, null);
                                } else if (_.isEmpty(found)) {
                                    callback1(null, pollArr, dataToSend, interest);
                                } else {
                                    if (!_.isEmpty(pollArr)) {
                                        pollArr = _.compact(_.concat(pollArr, found));
                                    } else {
                                        pollArr = found;
                                    }
                                    // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^", dataToSend)
                                    callback1(null, pollArr, dataToSend, interest);
                                }

                            })
                        }
                    }
                },
                function (pollArr, dataToSend, interest, callback2) {

                    // console.log("2nd function************", pollArr, interest, dataToSend)
                    var pollArrs = [];
                    _.each(pollArr, function (n) {
                        pollArrs.push(n.news);
                    });
                    // console.log("  ============================ pollArrs =====================", pollArrs);
                    filter._id = {}
                    filter._id.$in = pollArrs;
                    if (dataToSend.startDate != undefined) {
                        // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
                        filter.createdAt = {
                            $gte: moment(startDate).startOf('day'),
                            $lte: moment(endDate).endOf('day')
                        }
                    }

                    // console.log("interestArrinterestArrinterestArrinterestArr", interestArr)
                    // filter.interest.$in = interest;
                    if (!_.isEmpty(interest)) {
                        var interestArr = [];
                        _.each(interest, function (n) {
                            interestArr.push(n.name);
                        });
                        filter.interest = {
                            $in: interestArr
                        }

                    }
                    filter.isDisable = "NO"

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
                    NewsInfo.find(filter, {})
                        .deepPopulate("polls.poll.user comments.comment.user shareNewsCount.sharenews.user")
                        .order(options)
                        .keyword(options)
                        .page(options,
                            function (err, found) {
                                if (err) {
                                    callback(err, null);
                                } else if (found) {
                                    // console.log("&&&&&&&&&&&&&&&&&&&", found.results)
                                    _.each(found.results, function (pp) {
                                        _.each(pp.polls, function (pp1) {
                                            console.log("%%%%%%%%%%%%%%%%%%%%%", pp.polls)
                                            var temp = _.find(pp.polls, function (o) {

                                                if (o.poll) {
                                                    if (o.poll.user) {
                                                        // console.log("**********",o.poll.user._id,'&&&&&&&&&&&&',userId)
                                                        if ((o.poll.user._id.equals(userId))) {
                                                            // console.log("Inside if condition")
                                                            pp.flagForPoll = true
                                                        } else {
                                                            // console.log("Inside elsae condition")
                                                        }
                                                    }
                                                }
                                                if (o.poll == null) {
                                                    return o;
                                                }
                                                if (o.poll.user == null) {
                                                    return o;
                                                }
                                                if (o.poll) {
                                                    if (o.poll.user) {
                                                        if (o.poll.user.status == "Deactive") {
                                                            return o;
                                                        }
                                                    }
                                                }


                                            });
                                            if (temp === undefined) {} else {
                                                _.pull(pp.polls, temp)
                                            }

                                        })

                                        _.each(pp.comments, function (pp2) {

                                            var temp1 = _.find(pp.comments, function (r) {
                                                if (r.comment) {
                                                    if (r.comment.user) {
                                                        if ((r.comment.user._id.equals(userId))) {
                                                            pp.flagForKwack = true
                                                            // console.log("********************************inside if cond")
                                                        } else {
                                                            // console.log("*************inside else cond")
                                                        }
                                                    }
                                                }
                                                if (r.comment == null) {
                                                    return r;
                                                }
                                                if (r.comment.user == null) {
                                                    return r;
                                                }
                                                if (r.comment) {
                                                    if (r.comment.user) {
                                                        if (r.comment.user.status == "Deactive") {
                                                            return r;
                                                        }
                                                    }
                                                }


                                            });
                                            if (temp1 === undefined) {} else {
                                                _.pull(pp.comments, temp1)
                                            }

                                        })

                                        _.each(pp.shareNewsCount, function (pp2) {

                                            var temp1 = _.find(pp.shareNewsCount, function (r) {
                                                if (r.sharenews) {
                                                    if (r.sharenews.user) {
                                                        if ((r.sharenews.user._id.equals(userId))) {
                                                            pp.flagForShare = true
                                                            // console.log("********************************inside if cond")
                                                        } else {
                                                            // console.log("*************inside else cond")
                                                        }
                                                    }
                                                }
                                                if (r.sharenews == null) {
                                                    return r;
                                                }
                                                if (r.sharenews.user == null) {
                                                    return r;
                                                }
                                                if (r.sharenews) {
                                                    if (r.sharenews.user) {
                                                        if (r.sharenews.user.status == "Deactive") {
                                                            return r;
                                                        }
                                                    }
                                                }


                                            });
                                            if (temp1 === undefined) {} else {
                                                _.pull(pp.shareNewsCount, temp1)
                                            }

                                        })
                                    })
                                    callback(null, found);
                                } else {
                                    callback("Invalid data", null);
                                }
                            });

                },
            ],
            function (err, data) {
                // console.log("exe final:", data);

                if (err || _.isEmpty(data)) {
                    // console.log("exe final is empty:");
                    callback(err, [])
                } else {
                    console.log("exe final callback:");
                    callback(null, data)
                }
            });
    },


    /**
     * this function for search news in searchbox by news description
     *  @param {searchText} input searchText
     * @param {callback} callback function with err and response
     */
    searchNewsByDesc: function (data, callback) {
        var trimText = data.searchText.trim();
        var search = new RegExp('' + trimText);

        var queryString = {
            description: {
                $regex: search,
                $options: "i"
            }

        }

        NewsInfo.find(queryString).limit(5).exec(function (error, NewsInfoFound) {
            if (error || NewsInfoFound == undefined) {
                callback(error, null);
            } else {
                if (!_.isEmpty(NewsInfoFound)) {
                    callback(null, NewsInfoFound);
                } else {
                    callback(null, []);
                }
            }
        });
    },
    /**
     * this function for search news in searchbox by news Title
     *  @param {searchText} input searchText
     * @param {callback} callback function with err and response
     */
    searchNewsByTitle: function (data, callback) {
        var trimText = data.searchText.trim();
        var search = new RegExp('' + trimText);

        var queryString = {
            name: {
                $regex: search,
                $options: "i"
            }

        }

        NewsInfo.find(queryString).limit(5).exec(function (error, NewsInfoFound) {
            if (error || NewsInfoFound == undefined) {
                callback(error, null);
            } else {
                if (!_.isEmpty(NewsInfoFound)) {
                    callback(null, NewsInfoFound);
                } else {
                    callback(null, []);
                }
            }
        });
    },

    /**
     * this function for get Trending News
     * @param {callback} callback function with err and response
     */
    getTrendingNews: function (userId, callback) {
        NewsInfo.find({
            trending: "YES",
            isDisable: 'NO'
        }).deepPopulate('polls.poll.user comments.comment.user shareNewsCount.sharenews.user').exec(function (err, found) {
            if (err) {
                console.log("ERRRRRRRRRRRR", err)
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback("noDataound", null);
            } else {
                // console.log("***********************8inside getTrendingNews", found)
                // console.log("********************************", found)
                _.each(found, function (pp) {
                    _.each(pp.polls, function (pp1) {

                        var temp = _.find(pp.polls, function (o) {
                            if (o.poll) {
                                if (o.poll.user) {
                                    if ((o.poll.user._id.equals(userId))) {
                                        pp.flagForPoll = true
                                    } else {}
                                }
                            }
                            if (o.poll == null) {
                                return o;
                            }
                            if (o.poll.user == null) {
                                return o;
                            }
                            if (o.poll) {
                                if (o.poll.user) {
                                    if (o.poll.user.status == "Deactive") {
                                        return o;
                                    }
                                }
                            }


                        });
                        if (temp === undefined) {} else {
                            _.pull(pp.polls, temp)
                        }

                    })

                    _.each(pp.comments, function (pp2) {

                        var temp1 = _.find(pp.comments, function (r) {
                            if (r.comment) {
                                if (r.comment.user) {
                                    if ((r.comment.user._id.equals(userId))) {
                                        pp.flagForKwack = true
                                        // console.log("********************************inside if cond")
                                    } else {
                                        // console.log("*************inside else cond")
                                    }
                                }
                            }
                            if (r.comment == null) {
                                return r;
                            }
                            if (r.comment.user == null) {
                                return r;
                            }
                            if (r.comment) {
                                if (r.comment.user) {
                                    if (r.comment.user.status == "Deactive") {
                                        return r;
                                    }
                                }
                            }


                        });
                        if (temp1 === undefined) {} else {
                            _.pull(pp.comments, temp1)
                        }

                    })
                    _.each(pp.shareNewsCount, function (pp2) {

                        var temp1 = _.find(pp.shareNewsCount, function (r) {
                            if (r.sharenews) {
                                if (r.sharenews.user) {
                                    if ((r.sharenews.user._id.equals(userId))) {
                                        pp.flagForShare = true
                                        // console.log("********************************inside if cond")
                                    } else {
                                        // console.log("*************inside else cond")
                                    }
                                }
                            }
                            if (r.sharenews == null) {
                                return r;
                            }
                            if (r.sharenews.user == null) {
                                return r;
                            }
                            if (r.sharenews) {
                                if (r.sharenews.user) {
                                    if (r.sharenews.user.status == "Deactive") {
                                        return r;
                                    }
                                }
                            }


                        });
                        if (temp1 === undefined) {} else {
                            _.pull(pp.shareNewsCount, temp1)
                        }

                    })
                })
                callback(null, found);
            }

        });
    },

    /**
     * this function for search All News with paggination
     * @param {page} input page
     * @param {callback} callback function with err and response
     */
    getAllNews1: function (data, userId, callback) {
        console.log("inside get getAllNews1", data.page)
        data.page=data.page+1
       
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
        NewsInfo.find({
                isDisable: 'NO'
            }).skip(5)
            .deepPopulate("polls.poll.user comments.comment.user shareNewsCount.sharenews.user realTotalCount.readcount.user")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    if (err) {
                        console.log("ERRRRRRRRRRRR", err)
                        callback(err, null);
                    } else if (found) {
                        _.each(found.results, function (pp) {
                            _.each(pp.realTotalCount, function (pp1) {
                                var temp = _.find(pp.realTotalCount, function (o) {
                                    if (o.readcount == null) {
                                        return o;
                                    }
                                    if (o.readcount.user == null) {
                                        return o;
                                    }
                                    if (o.readcount.user) {
                                        if (o.readcount.user.status == "Deactive") {
                                            return o;
                                        }

                                    }

                                });
                                if (temp === undefined) {} else {
                                    _.pull(pp.realTotalCount, temp)
                                }
                            })
                            _.each(pp.polls, function (pp1) {

                                var temp = _.find(pp.polls, function (o) {
                                    if (o.poll) {
                                        if (o.poll.user) {
                                            if ((o.poll.user._id.equals(userId))) {
                                                pp.flagForPoll = true
                                            } else {}
                                        }
                                    }
                                    if (o.poll == null) {
                                        return o;
                                    }
                                    if (o.poll.user == null) {
                                        return o;
                                    }
                                    if (o.poll) {
                                        if (o.poll.user) {
                                            if (o.poll.user.status == "Deactive") {
                                                return o;
                                            }
                                        }
                                    }

                                });
                                if (temp === undefined) {} else {
                                    _.pull(pp.polls, temp)
                                }




                            })
                            _.each(pp.shareNewsCount, function (pp1) {

                                var temp1 = _.find(pp.shareNewsCount, function (o) {
                                    if (o.sharenews) {
                                        if (o.sharenews.user) {
                                            if ((o.sharenews.user._id.equals(userId))) {
                                                pp.flagForShare = true
                                            } else {}
                                        }
                                    }
                                    if (o.sharenews == null) {
                                        return o;
                                    }
                                    if (o.sharenews.user == null) {
                                        return o;
                                    }
                                    if (o.sharenews) {
                                        if (o.sharenews.user) {
                                            if (o.sharenews.user.status == "Deactive") {
                                                return o;
                                            }
                                        }
                                    }

                                });
                                if (temp1 === undefined) {} else {
                                    _.pull(pp.shareNewsCount, temp1)
                                }


                            })

                            _.each(pp.comments, function (pp2) {

                                var temp1 = _.find(pp.comments, function (r) {
                                    if (r.comment) {
                                        if (r.comment.user) {
                                            if ((r.comment.user._id.equals(userId))) {
                                                pp.flagForKwack = true
                                                // console.log("********************************inside if cond")
                                            } else {
                                                // console.log("*************inside else cond")
                                            }
                                        }
                                    }
                                    if (r.comment == null) {
                                        return r;
                                    }
                                    if (r.comment.user == null) {
                                        return r;
                                    }
                                    if (r.comment) {
                                        if (r.comment.user) {
                                            if (r.comment.user.status == "Deactive") {
                                                return r;
                                            }
                                        }
                                    }

                                });
                                if (temp1 === undefined) {} else {
                                    _.pull(pp.comments, temp1)
                                }


                            })


                            // async.each(data.results, function (userInfo, callback) {

                            // }, function (err) {
                            //     callback(null, "err");
                            // })
                        })

                        callback(null, found);
                    } else {
                        callback("Invalid data", null);
                    }
                });
    },
    /**
     * this function for search New added News with paggination
     * @param {page} input page
     * @param {callback} callback function with err and response
     */
    getAllNewsJustNow: function (data, userId, callback) {

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
        NewsInfo.find({
                isDisable: 'NO'
            }).limit(2)
            .deepPopulate("polls.poll.user comments.comment.user shareNewsCount.sharenews.user  realTotalCount.readcount.user")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    if (err) {
                        console.log("EEEEEERRRRRRRRRR", err)
                        callback(err, null);
                    } else if (found) {
                        _.each(found.results, function (pp) {
                            _.each(pp.realTotalCount, function (pp3) {
                                if (pp3.readcount) {
                                    var temp = _.find(pp.realTotalCount, function (o) {
                                        if (o.readcount.user) {
                                            if (o.readcount.user.status == "Deactive") {
                                                return o;
                                            }
                                        }

                                    });
                                    if (temp === undefined) {} else {
                                        _.pull(pp.realTotalCount, temp)
                                    }
                                }
                            })
                            _.each(pp.polls, function (pp1) {

                                var temp = _.find(pp.polls, function (o) {
                                    if (o.poll) {
                                        if (o.poll.user) {
                                            if ((o.poll.user._id.equals(userId))) {
                                                pp.flagForPoll = true
                                            } else {}
                                        }
                                    }
                                    if (o.poll == null) {
                                        return o;
                                    }
                                    if (o.poll.user == null) {
                                        return o;
                                    }
                                    if (o.poll) {
                                        if (o.poll.user) {
                                            if (o.poll.user.status == "Deactive") {
                                                return o;
                                            }
                                        }
                                    }

                                });
                                if (temp === undefined) {} else {
                                    _.pull(pp.polls, temp)
                                }


                            })

                            _.each(pp.shareNewsCount, function (pp1) {

                                var temp1 = _.find(pp.shareNewsCount, function (o) {
                                    if (o.sharenews) {
                                        if (o.sharenews.user) {
                                            if ((o.sharenews.user._id.equals(userId))) {
                                                pp.flagForShare = true
                                            } else {}
                                        }
                                    }
                                    if (o.sharenews == null) {
                                        return o;
                                    }
                                    if (o.sharenews.user == null) {
                                        return o;
                                    }
                                    if (o.sharenews) {
                                        if (o.sharenews.user) {
                                            if (o.sharenews.user.status == "Deactive") {
                                                return o;
                                            }
                                        }
                                    }

                                });
                                if (temp1 === undefined) {} else {
                                    _.pull(pp.shareNewsCount, temp1)
                                }


                            })

                            _.each(pp.comments, function (pp2) {

                                var temp1 = _.find(pp.comments, function (r) {
                                    if (r.comment) {
                                        if (r.comment.user) {
                                            if ((r.comment.user._id.equals(userId))) {
                                                pp.flagForKwack = true
                                                // console.log("********************************inside if cond")
                                            } else {
                                                // console.log("*************inside else cond")
                                            }
                                        }
                                    }
                                    if (r.comment == null) {
                                        return r;
                                    }
                                    if (r.comment.user == null) {
                                        return r;
                                    }
                                    if (r.comment) {
                                        if (r.comment.user) {
                                            if (r.comment.user.status == "Deactive") {
                                                return r;
                                            }
                                        }
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

    /**
     * this function for search News by interest with paggination
     * @param {page} input page
     * * @param {userInterest} input userInterest
     * @param {callback} callback function with err and response
     */
    getNewsByInterest: function (data, userId, callback) {
        console.log("inside api interest", userId)
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
        NewsInfo.find({
                interest: data.userInterest,
                isDisable: 'NO'
            })
            .deepPopulate("comments.comment.user polls.poll.user shareNewsCount.sharenews.user")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    if (err) {
                        console.log("ERRRRRR", err)
                        callback(err, null);
                    } else if (found) {
                        console.log("FOund****", found)
                        _.each(found.results, function (pp) {
                            _.each(pp.polls, function (pp1) {

                                var temp = _.find(pp.polls, function (o) {
                                    if (o.poll) {
                                        if (o.poll.user) {
                                            if ((o.poll.user._id.equals(userId))) {
                                                pp.flagForPoll = true
                                            } else {}
                                        }
                                    }
                                    if (o.poll == null) {
                                        return o;
                                    }
                                    if (o.poll.user == null) {
                                        return o;
                                    }
                                    if (o.poll) {
                                        if (o.poll.user) {
                                            if (o.poll.user.status == "Deactive") {
                                                return o;
                                            }
                                        }
                                    }

                                });
                                if (temp === undefined) {} else {
                                    _.pull(pp.polls, temp)
                                }


                            })

                            _.each(pp.comments, function (pp2) {

                                var temp1 = _.find(pp.comments, function (r) {
                                    if (r.comment) {
                                        if (r.comment.user) {
                                            if ((r.comment.user._id.equals(userId))) {
                                                pp.flagForKwack = true
                                                // console.log("********************************inside if cond")
                                            } else {
                                                // console.log("*************inside else cond")
                                            }
                                        }
                                    }
                                    if (r.comment == null) {
                                        return r;
                                    }
                                    if (r.comment.user == null) {
                                        return r;
                                    }
                                    if (r.comment) {
                                        if (r.comment.user) {
                                            if (r.comment.user.status == "Deactive") {
                                                return r;
                                            }
                                        }
                                    }

                                });
                                if (temp1 === undefined) {} else {
                                    _.pull(pp.comments, temp1)
                                }


                            })
                            _.each(pp.shareNewsCount, function (pp2) {

                                var temp1 = _.find(pp.shareNewsCount, function (r) {
                                    if (r.sharenews) {
                                        if (r.sharenews.user) {
                                            if ((r.sharenews.user._id.equals(userId))) {
                                                pp.flagForShare = true
                                                // console.log("********************************inside if cond")
                                            } else {
                                                // console.log("*************inside else cond")
                                            }
                                        }
                                    }
                                    if (r.sharenews == null) {
                                        return r;
                                    }
                                    if (r.sharenews.user == null) {
                                        return r;
                                    }
                                    if (r.sharenews) {
                                        if (r.sharenews.user) {
                                            if (r.sharenews.user.status == "Deactive") {
                                                return r;
                                            }
                                        }
                                    }

                                });
                                if (temp1 === undefined) {} else {
                                    _.pull(pp.shareNewsCount, temp1)
                                }


                            })
                        })
                        callback(null, found);
                    } else {
                        callback("Invalid data", null);
                    }
                });
    },


    /**
     * this function for search News by interest with paggination
     * @param {page} input page
     * * @param {userInterest} input userInterest
     * @param {callback} callback function with err and response
     */
    getNewsByInterestWithoutOneNews: function (data, newsId, userId, callback) {
        console.log("$$$$$$$$$$$$$$$$$$44", data.page, userId)
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
        NewsInfo.find({
                interest: data.userInterest,
                _id: {
                    $ne: newsId
                },
                isDisable: 'NO'
            })
            .deepPopulate("polls.poll comments.comment")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    if (err) {
                        console.log("ERRRRRRR", err)
                        callback(err, null);
                    } else if (found) {

                        callback(null, found);
                    } else {
                        callback("Invalid data", null);
                    }
                });
    },

    /**
     * this function for search Explore News  with paggination
     *  @param {page} input page 
     * @param {callback} callback function with err and response
     */
    getExploreNews: function (data, userId, callback) {
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
        NewsInfo.find({
                isExplore: "YES",
                isDisable: 'NO'
            })
            .deepPopulate("polls.poll.user comments.comment.user")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    if (err) {
                        console.log("errrrrrr", err)
                        callback(err, null);
                    } else if (found) {
                        _.each(found.results, function (pp) {
                            _.each(pp.polls, function (pp1) {

                                var temp = _.find(pp.polls, function (o) {
                                    if (o.poll) {
                                        if (o.poll.user) {
                                            if ((o.poll.user._id.equals(userId))) {
                                                pp.flagForPoll = true
                                                // console.log("********************************inside if cond")
                                            } else {
                                                // console.log("*************inside else cond")
                                            }
                                        }
                                    }
                                    if (o.poll == null) {
                                        return o;
                                    }
                                    if (o.poll.user == null) {
                                        return o;
                                    }
                                    if (o.poll) {
                                        if (o.poll.user) {
                                            if (o.poll.user.status == "Deactive") {
                                                return o;
                                            }
                                        }
                                    }


                                });
                                if (temp === undefined) {} else {
                                    _.pull(pp.polls, temp)
                                }


                            })

                            _.each(pp.comments, function (pp2) {

                                var temp1 = _.find(pp.comments, function (r) {
                                    if (r.comment) {
                                        if (r.comment.user) {
                                            if ((r.comment.user._id.equals(userId))) {
                                                pp.flagForKwack = true
                                                // console.log("********************************inside if cond")
                                            } else {
                                                // console.log("*************inside else cond")
                                            }
                                        }
                                    }

                                    if (r.comment == null) {
                                        return r;
                                    }
                                    if (r.comment.user == null) {
                                        return r;
                                    }
                                    if (r.comment)

                                    {
                                        if (r.comment.user) {
                                            if (r.comment.user.status == "Deactive") {
                                                return r;
                                            }
                                        }
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

    /**
     * this function for search Social News
     * @param {page} input page 
     * @param {callback} callback function with err and response
     */
    getSocialNews: function (data, userId, callback) {
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
        NewsInfo.find({
                isSocial: "YES",
                isDisable: 'NO'
            })
            .deepPopulate("polls.poll.user comments.comment.user shareNewsCount.sharenews.user")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    if (err) {
                        console.log("ERRRRRRRR", err)
                        callback(err, null);
                    } else if (found) {
                        _.each(found.results, function (pp) {
                            _.each(pp.polls, function (pp1) {

                                var temp = _.find(pp.polls, function (o) {
                                    if (o.poll) {
                                        if (o.poll.user) {
                                            if ((o.poll.user._id.equals(userId))) {
                                                pp.flagForPoll = true
                                                // console.log("********************************inside if cond")
                                            } else {
                                                // console.log("*************inside else cond")
                                            }
                                        }
                                    }
                                    if (o.poll == null) {
                                        return o;
                                    }
                                    if (o.poll.user == null) {
                                        return o;
                                    }
                                    if (o.poll) {
                                        if (o.poll.user) {
                                            if (o.poll.user.status == "Deactive") {
                                                return o;
                                            }
                                        }
                                    }

                                });
                                if (temp === undefined) {} else {
                                    _.pull(pp.polls, temp)
                                }


                            })

                            _.each(pp.comments, function (pp2) {

                                var temp1 = _.find(pp.comments, function (r) {
                                    if (r.comment) {
                                        if (r.comment.user) {
                                            if ((r.comment.user._id.equals(userId))) {
                                                pp.flagForKwack = true
                                                // console.log("********************************inside if cond")
                                            } else {
                                                // console.log("*************inside else cond")
                                            }
                                        }
                                    }
                                    if (r.comment == null) {
                                        return r;
                                    }
                                    if (r.comment.user == null) {
                                        return r;
                                    }
                                    if (r.comment) {
                                        if (r.comment.user) {
                                            if (r.comment.user.status == "Deactive") {
                                                return r;
                                            }
                                        }
                                    }

                                });
                                if (temp1 === undefined) {} else {
                                    _.pull(pp.comments, temp1)
                                }


                            })
                            _.each(pp.shareNewsCount, function (pp2) {

                                var temp1 = _.find(pp.shareNewsCount, function (r) {
                                    if (r.sharenews) {
                                        if (r.sharenews.user) {
                                            if ((r.sharenews.user._id.equals(userId))) {
                                                pp.flagForShare = true
                                                // console.log("********************************inside if cond")
                                            } else {
                                                // console.log("*************inside else cond")
                                            }
                                        }
                                    }
                                    if (r.sharenews == null) {
                                        return r;
                                    }
                                    if (r.sharenews.user == null) {
                                        return r;
                                    }
                                    if (r.sharenews) {
                                        if (r.sharenews.user) {
                                            if (r.sharenews.user.status == "Deactive") {
                                                return r;
                                            }
                                        }
                                    }

                                });
                                if (temp1 === undefined) {} else {
                                    _.pull(pp.shareNewsCount, temp1)
                                }


                            })
                        })
                        callback(null, found);
                    } else {
                        callback("Invalid data", null);
                    }
                });
    },


    /**
     * this function for get One News for particular NewsId
     * @param {newsId} input newsId 
     * @param {callback} callback function with err and response
     */
    getOneNews: function (newsId, userId, callback) {
        // console.log("newuserIduserIduserIduserIdsId", userId)
        NewsInfo.findOne({
            _id: newsId
        }).deepPopulate('polls.poll.user comments.comment.user comments.comment.repliesTo.user comments.comment.likes.userId comments.comment.likes.userId comments.comment.repliesTo.likes shareNewsCount.sharenews.user').exec(function (err, found) {
            if (err) {
                console.log("errrrrrrrrrrrrrrrr", err)
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback("noDataound", null);
            } else {


                _.each(found.comments, function (pp2) {


                    var temp1 = _.find(found.comments, function (r) {
                        if (r.comment) {
                            _.each(r.comment.likes, function (like) {

                                if (like.userId) {
                                    if ((like.userId._id.equals(userId))) {
                                        r.comment.flagForLike = true
                                    }
                                }


                            })
                        }
                        if (r.comment) {
                            _.each(r.comment.repliesTo, function (reply) {
                                _.each(reply.likes, function (like) {
                                    if ((like._id.equals(userId))) {
                                        reply.flagForLikeReply = true
                                    }

                                })
                            })
                        }
                        if (r.comment == null) {
                            return r;
                        }
                        if (r.comment.user == null) {
                            return r;
                        }
                        if (r.comment.user) {
                            if ((r.comment.user._id.equals(userId))) {
                                found.flagForKwack = true
                            } else {}
                        }




                        if (r.comment.user) {
                            if (r.comment.user.status == "Deactive") {
                                return r;
                            }
                        }



                    });
                    if (temp1 === undefined) {} else {
                        _.pull(found.comments, temp1)
                    }


                })

                _.each(found.comments, function (pp2) {
                    _.each(pp2.comment.repliesTo, function (reply) {
                        var temp2 = _.find(pp2.comment.repliesTo, function (re) {
                            //   console.log("reeeeeeeeeeeeee",re.user.status)
                            if (re.user == null) {
                                return re;
                            }
                            if (re.user) {
                                if (re.user.status == "Deactive") {
                                    return re;
                                }

                            }

                        });
                        if (temp2 === undefined) {} else {
                            _.pull(pp2.comment.repliesTo, temp2)
                        }

                    })

                    _.each(pp2.comment.likes, function (like) {
                        var temp3 = _.find(pp2.comment.likes, function (le) {
                            //   console.log("reeeeeeeeeeeeee",le.userId.status)
                            if (le.userId == null) {
                                return le;
                            }
                            if (le.userId) {
                                if (le.userId.status == "Deactive") {
                                    return le;
                                }

                            }

                        });
                        if (temp3 === undefined) {} else {
                            _.pull(pp2.comment.likes, temp3)
                        }

                    })
                })


                _.each(found.polls, function (pp1) {


                    var temp4 = _.find(found.polls, function (o) {
                        if (o.poll) {
                            if (o.poll.user) {
                                if ((o.poll.user._id.equals(userId))) {
                                    found.flagForPoll = true
                                } else {}
                            }
                        }

                        if (o.poll == null) {
                            return o;
                        }
                        if (o.poll.user == null) {
                            return o;
                        }




                        if (o.poll.user) {
                            if (o.poll.user.status == "Deactive") {
                                return o;
                            }
                        }



                    });
                    if (temp4 === undefined) {} else {
                        _.pull(found.polls, temp4)
                    }


                })

                _.each(found.shareNewsCount, function (pp1) {
                    console.log("*******************", pp1)

                    var temp4 = _.find(found.shareNewsCount, function (o) {
                        console.log("&&&&&&&&&&&&&&&", o)
                        if (o.sharenews) {
                            if (o.sharenews.user) {
                                if ((o.sharenews.user._id.equals(userId))) {
                                    found.flagForShare = true
                                } else {}
                            }
                        }

                        if (o.sharenews == null) {
                            return o;
                        }
                        if (o.sharenews.user == null) {
                            return o;
                        }




                        if (o.sharenews.user) {
                            if (o.sharenews.user.status == "Deactive") {
                                return o;
                            }
                        }



                    });
                    if (temp4 === undefined) {} else {
                        _.pull(found.shareNewsCount, temp4)
                    }


                })


                callback(null, found);
            }

        });
    },

    storeNews: function (callback) {
        request.get({
            url: "https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=1e3a77df57424c7e9ae1b65a2a0b696f",
            withCredentials: false,
        }, function (err, response, body) {
            // console.log("err",err)
            //  console.log("responseresponse",response)
            // console.log("bodybodybodybodybodybody", response.status)
            if (err) {
                callback(err, null);
            } else if (body) {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    //
                }
                if (body.status.toUpperCase() == 'OK') {
                    NewsInfo.find({

                    }, {
                        url: 1
                    }).sort({
                        "createdAt": -1
                    }).deepPopulate().exec(function (err, found) {
                        // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%",found)
                        if (err) {
                            console.log("inside err condition", err)
                        } else if (_.isEmpty(found)) {
                            console.log("inside is empaty condition")
                            _.each(body.articles, function (value, index) {
                                if (value.title == "{{pageTitle}}") {
                                    console.log("news is not proper")
                                } else {
                                    var dataToSave = {}
                                    dataToSave.name = value.title,
                                        dataToSave.description = value.description
                                    dataToSave.url = value.url
                                    dataToSave.imageUrl = value.urlToImage
                                    dataToSave.source = value.source.id
                                    dataToSave.language="English"
                                    NewsInfo.saveData(dataToSave, function (err, created) {
                                        if (err) {
                                            console.log("Error occurred while storing news: ", err);
                                        } else if (_.isEmpty(created)) {
                                            console.log("no data created for article no: ", index);
                                        } else {
                                            console.log("article " + index + " saved successfully");
                                        }

                                    });
                                }

                            });

                        } else {
                            // callback(null, body.totalResults);
                            _.each(found, function (news) {
                                _.each(body.articles, function (value, index) {
                                    if (news.url == value.url) {

                                        value.newsFound = true;
                                    }
                                });
                            })
                            _.each(body.articles, function (value, index) {
                                if (!value.newsFound) {
                                    if (value.title == "{{pageTitle}}") {
                                        console.log("news is not ptroper")
                                    } else {
                                        var dataToSave = {}
                                        dataToSave.name = value.title,
                                            dataToSave.description = value.description
                                        dataToSave.url = value.url
                                        dataToSave.imageUrl = value.urlToImage
                                         dataToSave.language="English"
                                        NewsInfo.saveData(dataToSave, function (err, created) {
                                            if (err) {
                                                console.log("Error occurred while storing news: ", err);
                                            } else if (_.isEmpty(created)) {
                                                console.log("no data created for article no: ", index);
                                            } else {
                                                console.log("article " + index + " saved successfully");
                                            }
                                        });
                                    }

                                }
                            });
                        }

                    });

                }
            }
        });
    },

    search1: function (data, callback) {
        console.log("inside api serch")
        var maxCount = Config.maxRow;
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
            // sort: {
            //     asc: 'createdAt'
            // },
            start: (page - 1) * maxRow,
            count: maxRow
        };
        NewsInfo.find({}).sort({
                createdAt: -1
            })
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    } else if (found) {
                        callback(null, found);
                    } else {
                        callback("Invalid data", null);
                    }
                });
    }
};
module.exports = _.assign(module.exports, exports, model);