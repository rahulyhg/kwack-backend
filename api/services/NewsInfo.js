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
    isSocial: {
        type: String,
        enum: ['YES', 'NO']
    },
      isExplore: {
        type: String,
        enum: ['YES', 'NO']
    },
    trending: {
        type: String,
        default: "NO",
        enum: ['YES', 'NO']
    },
    IsPoll: {
        type: String,
        default: "YES",
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
    IsPollKwackIf: function (startDate, endDate, interest, userId, polls, kwacks, callback) {
        console.log("$$$$$$$$$$$$$$$$$$$$$$4444", startDate, endDate, polls, userId, kwacks)
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
                        console.log("inside api found POLLLLLLLLLLLL", found)
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
                                console.log("Call back is going fromm hereEEEEEEEEEEEEEEEEEEE", dataToSend)
                                callback1(null, pollArr, dataToSend, interest);
                            }
                        }
                    })
                } else {
                    callKwack();
                }

                function callKwack() {
                    console.log("inside kwack")
                    if (kwacks) {
                        Comment.find({
                            user: userId,
                        }, {
                            news: 1
                        }).exec(function (err, found) {
                            var dataToSend = {}
                            dataToSend.startDate = startDate;
                            dataToSend.endDate = endDate;
                            console.log("inside api found", found)
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
                                console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^", dataToSend)
                                callback1(null, pollArr, dataToSend, interest);
                            }

                        })
                    }
                }
            },
            function (pollArr, dataToSend, interest, callback2) {

                console.log("2nd function************", pollArr, interest, dataToSend)
                var pollArrs = [];
                _.each(pollArr, function (n) {
                    pollArrs.push(n.news);
                });
                console.log("  ============================ pollArrs =====================", pollArrs);
                filter._id = {}
                filter._id.$in = pollArrs;
                if (dataToSend.startDate != undefined) {
                    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
                    filter.createdAt = {
                        $gte: moment(startDate).startOf('day'),
                        $lte: moment(endDate).endOf('day')
                    }
                }

                console.log("interestArrinterestArrinterestArrinterestArr", interestArr)
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

                NewsInfo.find(filter, {
                    title: 1,
                    createdAt: 1,
                    interest: 1
                }).lean().exec(function (err, found) {
                    console.log("inside api found*************", found)
                    if (err) {
                        callback2(err, null);
                    } else if (_.isEmpty(found)) {
                        callback2("noDataound", null);
                    } else {
                        callback2(null, found);
                    }

                })

            },
        ], function (err, data) {
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
     * this function for get Trending News
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
     * this function for search All News with paggination
     * @param {page} input page
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
     * this function for search New added News with paggination
     * @param {page} input page
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
     * this function for search News by interest with paggination
     * @param {page} input page
     * * @param {userInterest} input userInterest
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
     * this function for search Explore News  with paggination
     *  @param {page} input page 
     * @param {callback} callback function with err and response
     */
    getExploreNews: function (data, callback) {
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
                isExplore: "YES"
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
     * this function for search Social News
     * @param {page} input page 
     * @param {callback} callback function with err and response
     */
    getSocialNews: function (data, callback) {
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
                isSocial: "YES"
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
     * this function for get One News for particular NewsId
     * @param {newsId} input newsId 
     * @param {callback} callback function with err and response
     */
    getOneNews: function (newsId, callback) {
        // console.log("newsId",newsId)
        NewsInfo.findOne({
            _id: newsId
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
     storeNews: function (callback) {
        request.get({
            url: "https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=1e3a77df57424c7e9ae1b65a2a0b696f",
            withCredentials: false,
        }, function (err, response, body) {
            // console.log("err",err)
            //  console.log("responseresponse",response)
            console.log("bodybodybodybodybodybody", response.status)
            if (err) {
                callback(err, null);
            } else if (body) {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    //
                }
                if (body.status.toUpperCase() == 'OK') {
                    console.log("&&&&&&&&&&&&&", body.totalResults);
                    callback(null, body.totalResults);
                    _.each(body.articles, function (value, index) {
                        var dataToSave = {}
                        dataToSave.title = value.title,
                            dataToSave.description = value.description
                        dataToSave.url = value.url
                        dataToSave.imageUrl = value.imageUrl
                        NewsInfo.saveData(dataToSave, function (err, created) {
                            if (err) {
                                console.log("Error occurred while storing news: ", err);
                            } else if (_.isEmpty(created)) {
                                console.log("no data created for article no: ", index);
                            } else {
                                console.log("article " + index + " saved successfully");
                            }

                        });
                    });
                }
            }
        });
    }
};
module.exports = _.assign(module.exports, exports, model);