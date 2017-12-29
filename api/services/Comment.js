var schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    news: {
        type: Schema.Types.ObjectId,
        ref: 'NewsInfo'
    },
    comment: {
        type: String

    },
    repliesTo: [{
        reply: String
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'

    }],
    kwack: {
        type: String
    }

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Comment', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    /**
     * this function add comment for news
     * @param {newsId} input newsId
     *  * @param {userId} input userId
     * *  * @param {comment} input comment
     * @param {callback} callback function with err and response
     */

    addComment: function (userId, newsId, comment, kwack, callback) {
        console.log("inside api", userId, newsId, comment, kwack)
        async.waterfall([
            function (callback1) {
                var comment1 = {}
                comment1.user = userId
                comment1.news = newsId
                comment1.comment = comment
                comment1.kwack = kwack
                Comment.saveData(comment1, function (err, created) {
                    if (err) {
                        callback1(err, null);
                    } else if (_.isEmpty(created)) {
                        callback1(null, "noDataound");
                    } else {
                        data1 = {}
                        data1.newsId = newsId;
                        data1.commentId = created._id
                        callback1(null, data1);
                    }
                });
            },
            function (Ids, callback2) {
                NewsInfo.findOne({
                    _id: Ids.newsId
                }).exec(function (err, found) {
                    if (err) {
                        callback2(err, null);
                    } else if (_.isEmpty(found)) {
                        callback2("noDataound", null);
                    } else {
                        var data1 = {}
                        data1._id = found._id;
                        data1.commentTotal = found.commentTotal + 1
                        NewsInfo.saveData(data1, function (err, created) {
                            if (err) {
                                callback2(err, null);
                            } else if (_.isEmpty(created)) {
                                callback2(null, "noDataound");
                            } else {

                                callback2(null, Ids);
                            }
                        });
                    }

                })

            },
            function (newsId, callback3) {
                NewsInfo.update({
                    _id: newsId.newsId
                }, {
                    $push: {
                        'comments': {
                            comment: newsId.commentId
                        }
                    }
                }).exec(function (err, found) {
                    if (err) {
                        callback3(err, null);
                    } else if (_.isEmpty(found)) {
                        callback3("noDataound", null);
                    } else {
                        callback3(null, found);
                    }

                });


            }
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
    },


    /**
     * this function Remove comment for news
     * @param {newsId} input newsId
     * * @param {commentId} input commentId
     * @param {callback} callback function with err and response
     */


    removeComment: function (newsId, commentId, callback) {

        async.waterfall([
            function (callback1) {
                var comment1 = {}
                comment1._id = commentId
                Comment.deleteData(comment1, function (err, created) {
                    if (err) {
                        callback1(err, null);
                    } else if (_.isEmpty(created)) {
                        callback1(null, "noDataound");
                    } else {
                        data1 = {}
                        data1.newsId = newsId;
                        data1.commentId = commentId
                        callback1(null, data1);
                    }
                });
            },
            function (Ids, callback2) {
                NewsInfo.findOne({
                    _id: Ids.newsId
                }).exec(function (err, found) {
                    if (err) {
                        callback2(err, null);
                    } else if (_.isEmpty(found)) {
                        callback2("noDataound", null);
                    } else {
                        var data1 = {}
                        data1._id = found._id;
                        data1.commentTotal = found.commentTotal - 1
                        console.log("data1 is", data1)
                        NewsInfo.saveData(data1, function (err, created) {
                            if (err) {
                                callback2(err, null);
                            } else if (_.isEmpty(created)) {
                                callback2(null, "noDataound");
                            } else {

                                callback2(null, Ids);
                            }
                        });
                    }

                })

            },
            function (newsId, callback3) {
                NewsInfo.update({
                    _id: newsId.newsId
                }, {
                    $pull: {
                        'comments': {
                            comment: newsId.commentId
                        }
                    }
                }).exec(function (err, found) {
                    if (err) {
                        callback3(err, null);
                    } else if (_.isEmpty(found)) {
                        callback3("noDataound", null);
                    } else {
                        callback3(null, found);
                    }

                });


            }
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
    },
    /**
     * this function edit comment for news
     * @param {newsId} input newsId
     *  * @param {userId} input userId
     * *  * @param {comment} input comment
     * @param {callback} callback function with err and response
     */
    editComment: function (commentId, comment, callback) {

        var comment1 = {}
        comment1.comment = comment
        comment1._id = commentId
        Comment.saveData(comment1, function (err, created) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(created)) {
                callback(null, "noDataound");
            } else {
                callback(null, created)
            }

        })
    },

    /**
     * this function add  reply for news
     * @param {commentId} input commentId
     *  * @param {reply} input reply
     * @param {callback} callback function with err and response
     */
    addReply: function (commentId, reply, callback) {

        Comment.update({
            _id: commentId
        }, {
            $push: {
                'repliesTo': {
                    reply: reply
                }
            }
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
     * this function remove  reply for news
     * @param {commentId} input commentId
     *  * @param {replyId} input replyId
     * @param {callback} callback function with err and response
     */
    removeReply: function (commentId, replyId, callback) {

        Comment.update({
            _id: commentId
        }, {
            $pull: {
                'repliesTo': {
                    _id: replyId
                }
            }
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



};
module.exports = _.assign(module.exports, exports, model);