var schema = new Schema({
    title: {
        type: String,

    },
    description: {
        type: String,

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


    pollOptions: [{
        title: {
            type: String
        },
        percentage: {
            type: Number,
            default: 0
        }
    }],


    pollQuestion: {
        type: String,

    },
    interest: {
        type: String,

    },
    realTotalCount: {
        type: Number,
        default: 0
    },
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

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('NewsInfo', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    //  demo: function (startDate,endDate,callback) {
    //     NewsInfo.find({
    //         createdAt: {
    //             $gte: moment(startDate).startOf('day'), 
    //             $lte: moment(endDate).endOf('day')
    //         }
    //     },{createdAt:1,}).deepPopulate('polls.poll comments.comment').exec(function (err, found) {
    //         if (err) {
    //             callback(err, null);
    //         } else if (_.isEmpty(found)) {

    //             callback("noDataound", null);
    //         } else {
    //               console.log("found",found)
    //             callback(null, found);
    //         }

    //     });
    // },


    demo: function (startDate, endDate, callback) {

        // var findObj = {};
        // if (data.createdAt) {
        //     findObj.createdAt = {
        //         $gte: moment(startDate).startOf('day'),
        //         $lte: moment(endDate).endOf('day')
        //     }
        // }
        // if (data.interest) {
        //     findObj.interest = {$in: data.interest};
        // }
        async.waterfall([
            function (callback1) {
                if (intrest) {
                    NewsInfo.find({
                        createdAt: {
                            $gte: moment(startDate).startOf('day'),
                            $lte: moment(endDate).endOf('day')
                        },
                        interest: data.interest ? {
                            $in: data.interest
                        } : {
                            $or: [
                            {$exists: true}, {$exists: false}]
                        }
                    }).deepPopulate().exec(function (err, found) {
                        if (err) {
                            callback(err, null);
                        } else if (_.isEmpty(found)) {

                            callback("noDataound", null);
                        } else {
                            console.log("found", found)
                            callback(null, found);
                        }

                    });
                } else {

                }

            },
            function (foundData, callback2) {
                console.log("2nd function", foundData)
                // NewsInfo.findOne({
                //     _id: Ids.newsId
                // }).exec(function (err, found) {
                //     console.log("found data is", found)
                //     if (err) {
                //         callback2(err, null);
                //     } else if (_.isEmpty(found)) {
                //         callback2("noDataound", null);
                //     } else {
                //         var data2 = {}
                //         data2._id = found._id;
                //         data2.realTotalCount = found.realTotalCount + 1
                //         NewsInfo.saveData(data2, function (err, created) {
                //             if (err) {
                //                 callback2(err, null);
                //             } else if (_.isEmpty(created)) {
                //                 callback2(null, "noDataound");
                //             } else {

                //                 callback2(null, Ids);
                //             }
                //         });
                //     }

                // })

            },
            function (Ids, callback3) {
                // console.log("2nd function", Ids)
                // NewsInfo.findOne({
                //     _id: Ids.newsId
                // }).exec(function (err, found) {
                //     console.log("found data is", found)
                //     if (err) {
                //         callback3(err, null);
                //     } else if (_.isEmpty(found)) {
                //         callback3("noDataound", null);
                //     } else {
                //         callback3(null, found);
                //     }

                // })
            }
        ], function (err, data) {
            console.log("exe final:", data);

            if (err || _.isEmpty(data)) {
                console.log("exe final is empty:");
                callback(err, [])
            } else {
                console.log("exe final callback:");
                callback(null, data)
            }
        });
    },

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
    searchNewsByTitle: function (data, callback) {
        var trimText = data.searchText.trim();
        var search = new RegExp('' + trimText);

        var queryString = {
            title: {
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
     * this function for get One News
     * @param {callback} callback function with err and response
     */
    getTrendingNews: function (callback) {
        NewsInfo.find({
            trending: "YES"
        }).deepPopulate('polls.poll comments.comment').exec(function (err, found) {
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
     * this function for search All News
     * @param {callback} callback function with err and response
     */
    getAllNews1: function (data, callback) {
        // console.log("inside get getAllNews1",data)
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
                createdAt: 1
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };
        NewsInfo.find({})
            .deepPopulate("polls.poll comments.comment")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    if (err) {
                        callback(err, null);
                    } else if (found) {
                        callback(null, found);
                    } else {
                        callback("Invalid data", null);
                    }
                });
    },
    /**
     * this function for search New added News
     * @param {callback} callback function with err and response
     */
    getAllNewsJustNow: function (data, callback) {
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
        NewsInfo.find({})
            .deepPopulate("polls.poll comments.comment")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    if (err) {
                        callback(err, null);
                    } else if (found) {
                        callback(null, found);
                    } else {
                        callback("Invalid data", null);
                    }
                });
    },

    /**
     * this function for search News by interest
     * @param {callback} callback function with err and response
     */
    getNewsByInterest: function (data, callback) {
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
                interest: data.userInterest
            })
            .deepPopulate("polls.poll comments.comment")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    if (err) {
                        callback(err, null);
                    } else if (found) {
                        callback(null, found);
                    } else {
                        callback("Invalid data", null);
                    }
                });
    },

    /**
     * this function for search All News
     * @param {callback} callback function with err and response
     */
    getAllNews: function (callback) {

        NewsInfo.find({}).exec(function (err, found) {
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
     * this function for get One News
     * @param {callback} callback function with err and response
     */
    getOneNews: function (newsId, callback) {
        // console.log("newsId",newsId)
        NewsInfo.findOne({
            _id: newsId
        }).deepPopulate('polls.poll comments.comment.user').exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback("noDataound", null);
            } else {
                callback(null, found);
            }

        });
    }
};
module.exports = _.assign(module.exports, exports, model);