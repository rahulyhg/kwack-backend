module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
               /**
     * for get Kwack for Particular  user
     */
 getKwackForOneUser: function (req, res) {
        if (req.body) {
            Comment.getKwackForOneUser(req.body.userId, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
             /**
     * for get Kwack for Particular news and user
     */
 addLikeToReply: function (req, res) {
        if (req.body) {
            Comment.addLikeToReply(req.body.replyId,req.body.userId, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
               /**
     * for get Kwack for Particular commentId
     */
 getComment: function (req, res) {
        if (req.body) {
            Comment.getComment(req.body.commentId, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
             /**
     * for get Kwack for Particular news and user
     */
 getKwack: function (req, res) {
        if (req.body) {
            Comment.getKwack(req.body.newsId,req.body.userId, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
          /**
     *  to add comment 
     */
 addComment: function (req, res) {
        if (req.body) {
            console.log("req.body",req.body)
            Comment.addComment(req.body.userId,req.body.newsId,req.body.comment,req.body.kwack,req.body.anonymous, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
              /**
     *  to remove comment 
     */
 removeComment: function (req, res) {
        if (req.body) {
            Comment.removeComment(req.body.newsId,req.body.commentId, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
                  /**
     * to edit comment 
     */
 editComment: function (req, res) {
        if (req.body) {
            Comment.editComment(req.body.commentId,req.body.comment, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
               /**
     * to add reply for Comment
     */
 addReply: function (req, res) {
        if (req.body) {
            Comment.addReply(req.body.commentId,req.body.reply,req.body.user,req.body.anonymous,req.body.kwack, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
                  /**
     * to remove reply for Comment
     */
 removeReply: function (req, res) {
        if (req.body) {
            Comment.removeReply(req.body.commentId,req.body.replyId, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
                   /**
     * to add or remove like for Comment 
     */
 addOrRemoveLike: function (req, res) {
        if (req.body) {
            Comment.addOrRemoveLike(req.body.commentId,req.body.user, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
                  /**
     * to add like for Comment 
     */
     addLike: function (req, res) {
        if (req.body) {
            Comment.addLike(req.body.commentId,req.body.user, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
                  /**
     * to remove or remove like for Comment 
     */
     removeLike: function (req, res) {
        if (req.body) {
            Comment.removeLike(req.body.commentId,req.body.user, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
                /**
     * to add like for Reply 
     */

       addLikeToReply: function (req, res) {
        if (req.body) {
            Comment.addLikeToReply(req.body.comm,req.body.replyId,req.body.userId, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
                /**
     * to remove like for Reply 
     */
     removeLikeToReply: function (req, res) {
        if (req.body) {
            Comment.removeLikeToReply(req.body.comm,req.body.replyId,req.body.userId, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
};
module.exports = _.assign(module.exports, controller);
