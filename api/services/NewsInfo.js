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