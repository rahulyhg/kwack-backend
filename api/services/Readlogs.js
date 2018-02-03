var schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'

    },
    news: {
        type: Schema.Types.ObjectId,
        ref: 'NewsInfo'
    },
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Readlogs', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    /**
     * this function provides details about the poll
     * @param {newsId} input newsId
     * * @param {userId} input userId
     * @param {callback} callback function with err and response
     */
    checkingNewsReadOrNot: function (newsId, userId, callback) {
        console.log("newsId,userId,newsId,userId,", newsId, userId)
        Readlogs.findOne({
            news: newsId,
            user: userId
        }).exec(function (err, found) {
            // console.log("inside api found",found)
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback("noDataound", null);
            } else {
                callback(null, found);
            }

        })
    },
    /**
     * this function add readLogs for news and count total readlogs
     * @param {newsId} input newsId
     *  * @param {userId} input userId
     * @param {callback} callback function with err and response
     */

    readLogsCount: function (userId, newsId, callback) {
        console.log("inside api", userId, newsId)

        async.waterfall([
            function (callback1) {
                var logs = {}
                logs.user = userId
                logs.news = newsId
                Readlogs.saveData(logs, function (err, created) {
                    if (err) {
                        callback(err, null);
                    } else if (_.isEmpty(created)) {
                        callback(null, "noDataound");
                    } else {
                        data1 = {}
                        data1.newsId = newsId
                        data1.readId = created._id
                        callback1(null, data1);
                    }
                });
            },
            function (Ids, callback2) {
                console.log("2nd function", Ids)
                NewsInfo.update({
                    _id: Ids.newsId
                }, {
                    $push: {
                        'realTotalCount': {
                            readcount: Ids.readId
                        }
                    }
                }, {
                    new: true
                }).exec(function (err, found) {
                    if (err) {
                        callback2(err, null);
                    } else if (_.isEmpty(found)) {
                        callback2("noDataound", null);
                    } else {
                        callback2(null, Ids);
                    }

                });

            },
            function (Ids, callback3) {
                console.log("2nd function", Ids)
                NewsInfo.findOne({
                    _id: Ids.newsId
                }).exec(function (err, found) {
                    console.log("found data is", found)
                    if (err) {
                        callback3(err, null);
                    } else if (_.isEmpty(found)) {
                        callback3("noDataound", null);
                    } else {
                        callback3(null, found);
                    }

                })
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




};
module.exports = _.assign(module.exports, exports, model);