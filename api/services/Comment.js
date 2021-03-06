var schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    flagForLike: {
        type: Boolean,
        default: false
    },

    news: {
        type: Schema.Types.ObjectId,
        ref: 'NewsInfo'
    },
    comment: {
        type: String

    },
    repliesTo: [{
        reply: String,
        anonymous: {
            type: String,
            default: "NO"
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        kwack: {
            type: String
        },
        flagForLikeReply: {
            type: Boolean,
            default: false
        },
    }],
    likes: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    }],
    kwack: {
        type: String
    },
    anonymous: {
        type: String,
        default: "NO"
    }

});

schema.plugin(deepPopulate, {
    Populate: {
        'news': {

            select: '_id name'
        },
        'user': {
            select: '_id name'
        },
        'UserId': {
            select: '_id name'
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Comment', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "news user UserId", "news user UserId", "order", "asc"));
var model = {

    /**
     * this function provides Kwack for particular userId
     * @param {userId} input userId
     * @param {callback} callback function with err and response
     */
    getKwackForOneUser: function (userId, callback) {
        Comment.find({
            user: userId,
        }).deepPopulate().exec(function (err, found) {
            // console.log("inside api found gwt kwack", found)
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
     * this function provides Kwack for particular CommentId
     * @param {commentId} input commentId
     * @param {callback} callback function with err and response
     */
    getComment: function (commentId, callback) {
        Comment.findOne({
            _id: commentId,
        }).deepPopulate('user news repliesTo.user').exec(function (err, found) {
            // console.log("inside api found gwt kwack", found)
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
     * this function provides Kwack for particular news and user
     * @param {newsId} input newsId
     * * @param {userId} input userId
     * @param {callback} callback function with err and response
     */
    getKwack: function (newsId, userId, callback) {
        console.log("***********", newsId, userId)
        Comment.findOne({
            news: newsId,
            user: userId
        }).exec(function (err, found) {
            // console.log("inside api found gwt kwack", found)
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
     * this function add comment for news
     * @param {userId} input userId
     *  * @param {newsId} input newsId
     * *  * @param {comment} input comment
     * *  * * @param {kwack} input kwack
     *  * *  * * @param {anonymous} input anonymous
     * @param {callback} callback function with err and response
     */

    addComment: function (userId, newsId, comment, kwack, anonymous, callback) {
        var arr = ['behenchod', 'madarchod', 'jhatu', 'chutiya', 'lund', 'mc', 'asshole', 'bc', 'chutiye', 'bakland', 'bhandava', 'chinaal', 'chinal', 'bhadva', 'bhadve', 'chutia', 'choo-tia', 'chutan', 'haraami', 'harami', 'saale', 'gandu', 'hijda', 'hijdi','hijra', 'hijri', 'bhadvi','kutta','kutti','kuttiya','bahen chod','bahenchod','laude','chod','lavde','jhant','jhaat','maadher chod','raand','raandi','randi','randhwa','randwa','randvi','randhwi','rundi','booblay','bhonsRi','bhonsri', 'chut','bossadi','bossari','chodra','gaand','gand','lavda','lavander','muth', 'muthiya','bable','bhosad','chodela','lundtopi','lundoos','pucchi','puchi','arsehole','arse','bastard','bellend','berk','bint','blimey','gorblimey','blighter','bollocks','testicles','bugger','cack','cobblers','nonsense','cunt','vagina','dickhead','knob','bitch','cock','dick','penis','chutya','fuck','fuck off','fagutt','anal','boobs']
        // var str = comment.search(/demo2/i);
        // console.log(str, "str********");
        // _.each(arr, function (arr1) {
        //     var demo=/demo1/i
        //     var str = comment.search(demo);
        //     console.log(str, "str********");
        // })
        // temp=comment.toLowerCase()
        // console.log("%%%%%%%%%%%%%%%%%%%%%%%55",temp)
        // _.each(arr, function (arr1) {
        //     var str = comment.match(/arr1/i);
        //     console.log(str,"str********");
        //           if(str)
        //           {
        //               console.log(str,"str");
        // // comment=  _.replace(comment, arr1, '#####');
        //           }
        //  var res = patt1.ignoreCase;
        var setvarvalue
        temp = comment.toLowerCase()
        console.log("TEMPPPPPPPPPPPPP", temp)
        async.each(arr, function (arr1, callback) {
            if (temp.includes(arr1)) {
                console.log("Inside if cond")
                setvarvalue = true
                temp = _.replace(temp, arr1, '#####');

            }
        }, function (err) {
            console.log("Err while replacing gali")
            // callback(null, "err");
        })

        console.log("setvarvalue", setvarvalue)
        if (setvarvalue) {
            temp = temp
        } else {
            temp = comment
        }
        async.waterfall([
            function (callback1) {
                var comment1 = {}
                comment1.user = userId
                comment1.news = newsId
                comment1.comment = temp
                comment1.kwack = kwack,
                    comment1.anonymous = anonymous
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

            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
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

            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
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
     *  *  * @param {user} input user
     *   *  *  * @param {anonymous} input anonymous
     * @param {callback} callback function with err and response
     */
    addReply: function (commentId, reply, user, anonymous, kwack, callback) {
        var arr = ['behenchod', 'madarchod', 'jhatu', 'chutiya', 'lund', 'mc', 'asshole', 'bc', 'chutiye', 'bakland', 'bhandava', 'chinaal', 'chinal', 'bhadva', 'bhadve', 'chutia', 'choo-tia', 'chutan', 'haraami', 'harami', 'saale', 'gandu', 'hijda', 'hijdi','hijra', 'hijri', 'bhadvi','kutta','kutti','kuttiya','bahen chod','bahenchod','laude','chod','lavde','jhant','jhaat','maadher chod','raand','raandi','randi','randhwa','randwa','randvi','randhwi','rundi','booblay','bhonsRi','bhonsri', 'chut','bossadi','bossari','chodra','gaand','gand','lavda','lavander','muth', 'muthiya','bable','bhosad','chodela','lundtopi','lundoos','pucchi','puchi','arsehole','arse','bastard','bellend','berk','bint','blimey','gorblimey','blighter','bollocks','testicles','bugger','cack','cobblers','nonsense','cunt','vagina','dickhead','knob','bitch','cock','dick','penis','chutya','fuck','fuck off','fagutt','anal','boobs']
        var setvarvalue
            temp = reply.toLowerCase()
        console.log("TEMPPPPPPPPPPPPP", temp)
        async.each(arr, function (arr1, callback) {
            if (temp.includes(arr1)) {
                console.log("Inside if cond")
                setvarvalue=true
                temp = _.replace(temp, arr1, '#####');

            }
        }, function (err) {
            console.log("Err while replacing gali")
            // callback(null, "err");
        })
        if (setvarvalue) {
            temp = temp
        } else {
            temp = reply
        }
        Comment.update({
                _id: commentId,
            }, {
                $push: {
                    'repliesTo': {
                        user: user,
                        reply: temp,
                        anonymous: anonymous,
                        kwack: kwack
                    }
                }

            }

        ).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback("noDataound", null);
            } else {
                callback(null, found);
            }

        });
    },

    /**reply
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

    /**
     * this function add  Like Or Remove Like  for Comment
     * @param {commentId} input commentId
     *  *  * @param {user} input user
     * @param {callback} callback function with err and response
     */
    addOrRemoveLike: function (commentId, user, callback) {
        Comment.findOne({
            _id: commentId,

            'likes.userId': {
                $in: [mongoose.Types.ObjectId(user)]
            }

        }).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                Comment.addLike(commentId, user, callback);
            } else {
                Comment.removeLike(commentId, user, callback);
            }

        });

    },

    /**
     * this function add  Like  for Comment
     * @param {commentId} input commentId
     *  *  * @param {user} input user
     * @param {callback} callback function with err and response
     */
    addLike: function (commentId, user, callback) {
        console.log("inside add Like")
        Comment.update({
            _id: commentId
        }, {
            $push: {
                'likes': {
                    userId: user
                }
            }
        }).deepPopulate('wishList').exec(function (err, found) {
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
     * this function Remove  Like  for Comment
     * @param {commentId} input commentId
     *  *  * @param {user} input user
     * @param {callback} callback function with err and response
     */
    removeLike: function (commentId, user, callback) {

        console.log("inside remove Like")
        Comment.update({
            _id: mongoose.Types.ObjectId(commentId)

        }, {
            $pull: {
                'likes': {
                    userId: user
                }
            }
        }).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback(null, "noDataound");
            } else {
                callback(null, found);
            }

        });
    },


    /**
     * this function add like for particular Reply
     * @param {comm} input comm
     *  * @param {replyId} input replyId
     *   *  * @param {userId} input userId
     * @param {callback} callback function with err and response
     */


    addOrRemoveLikeTOReply: function (comm, replyId, userId, callback) {

        console.log("replyId", userId)
        Comment.find({
            repliesTo: {
                $elemMatch: {
                    _id: replyId,
                    likes: userId
                }
            }
        }).deepPopulate('').exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                Comment.addLikeToReply(comm, replyId, userId, callback);
            } else {
                Comment.removeLikeToReply(comm, replyId, userId, callback)

            }

        });
    },



    /**
     * this function add like for particular Reply
     * @param {comm} input comm
     *  * @param {replyId} input replyId
     *   *  * @param {userId} input userId
     * @param {callback} callback function with err and response
     */


    addLikeToReply: function (comm, replyId, userId, callback) {

        console.log("replyId", replyId, userId)
        Comment.findOneAndUpdate({
            _id: comm,
            repliesTo: {
                $elemMatch: {
                    _id: replyId
                }
            }
        }, {
            $push: {
                'repliesTo.$.likes': userId
            }
        }, {
            new: true
        }).deepPopulate('').exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback("noDatao und", null);
            } else {
                callback(null, found);
            }

        });
    },

    /**
     * this function remove like for particular Reply
     * @param {comm} input comm
     *  * @param {replyId} input replyId
     *   *  * @param {userId} input userId
     * @param {callback} callback function with err and response
     */
    removeLikeToReply: function (comm, replyId, userId, callback) {

        console.log("replyId", replyId, userId)
        Comment.findOneAndUpdate({
            _id: comm,
            repliesTo: {
                $elemMatch: {
                    _id: replyId
                }
            }
        }, {
            $pull: {
                'repliesTo.$.likes': userId
            }
        }, {
            new: true
        }).deepPopulate('').exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback("noDatafound", null);
            } else {
                callback(null, found);
            }

        });
    },
};
module.exports = _.assign(module.exports, exports, model);