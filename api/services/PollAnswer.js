var schema = new Schema({
    user: {
   type: Schema.Types.ObjectId,
        ref: 'User'
        
    },
     news: {
        type: Schema.Types.ObjectId,
        ref: 'NewsInfo'
    },
  pollOptions:{
   type: String,
  }
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
module.exports = mongoose.model('PollAnswer', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "news user", "news user", "order", "asc"));
var model = {


      /**
     * this function provides Kwack for particular CommentId
     * @param {commentId} input commentId
     * @param {callback} callback function with err and response
     */
    getPollForOneUser: function (userId, callback) {
        PollAnswer.find({
            user: userId,
        }).deepPopulate().exec(function (err, found) {
            console.log("inside api found gwt kwack", found)
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
     * this function provides All Polls
     * @param {callback} callback function with err and response
     */
    getAllPoll: function (callback) {
         PollAnswer.find({
                }).deepPopulate('news user').exec(function (err, found) {
                    console.log("inside api found",found)
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
     * this function provides details about the poll for particular user
     * @param {newsId} input newsId
      * * @param {userId} input userId
     * @param {callback} callback function with err and response
     */
    getPoll: function (newsId,userId, callback) {
         PollAnswer.findOne({
                    news: newsId,
                    user:userId
                }).exec(function (err, found) {
                    console.log("inside api found",found)
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
     * this function for news to add vote 
     * @param {newsId} input newsId
     *  * @param {pollname} input pollname
     *   *  * @param {userId} input newsId
     * @param {callback} callback function with err and response
     */
    addPollAnswer: function (newsId, pollname,userId, callback) {
        console.log("inside api",pollname,newsId,userId)
        if (pollname == 'YES') {
                console.log("inside api YES",pollname)
            async.waterfall([
            function (callback1) {
                var poll = {}
                poll.user = userId
                poll.news = newsId
                poll.pollOptions = pollname
                PollAnswer.saveData(poll, function (err, created) {
                    if (err) {
                        callback1(err, null);
                    } else if (_.isEmpty(created)) {
                        callback1(null, "noDataound");
                    } else {
                        data1 = {}
                        data1.newsId = newsId;
                        data1.pollId = created._id
                        callback1(null, data1);
                    }
                });
            },
            function (Ids, callback2) {
                 NewsInfo.update({
                    _id: Ids.newsId
                }, {
                    $push: {
                        'polls': {
                            poll: Ids.pollId
                        }
                    }
                }).exec(function (err, found) {
                    if (err) {
                        callback2(err, null);
                    } else if (_.isEmpty(found)) {
                        callback2("noDataound", null);
                    } else {
                        callback2(null, found);
                    }

                });

            },
          
        ], function (err, data) {
            console.log("exe final:");

            if (err || _.isEmpty(data)) {
                console.log("exe final is empty:");
                callback(err, [])
            } else {
                console.log("exe final callback:");
                callback(null, data)
            }
        });
        } else if (pollname == 'NO') {
                 async.waterfall([
            function (callback1) {
                var poll = {}
                poll.user = userId
                poll.news = newsId
                poll.pollOptions = pollname
                PollAnswer.saveData(poll, function (err, created) {
                    if (err) {
                        callback1(err, null);
                    } else if (_.isEmpty(created)) {
                        callback1(null, "noDataound");
                    } else {
                        data1 = {}
                        data1.newsId = newsId;
                        data1.pollId = created._id
                        callback1(null, data1);
                    }
                });
            },
            function (Ids, callback2) {
                 NewsInfo.update({
                    _id: Ids.newsId
                }, {
                    $push: {
                        'polls': {
                            poll: Ids.pollId
                        }
                    }
                }).exec(function (err, found) {
                    if (err) {
                        callback2(err, null);
                    } else if (_.isEmpty(found)) {
                        callback2("noDataound", null);
                    } else {
                        callback2(null, found);
                    }

                });

            },
          
        ], function (err, data) {
            console.log("exe final:");

            if (err || _.isEmpty(data)) {
                console.log("exe final is empty:");
                callback(err, [])
            } else {
                console.log("exe final callback:");
                callback(null, data)
            }
        });
        }

    },
};
module.exports = _.assign(module.exports, exports, model);