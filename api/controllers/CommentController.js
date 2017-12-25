module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
          /**
     *  to add comment 
     */
 addComment: function (req, res) {
        if (req.body) {
            Comment.addComment(req.body.userId,req.body.newsId,req.body.comment, res.callback);
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
     * to add reply 
     */
 addReply: function (req, res) {
        if (req.body) {
            Comment.addReply(req.body.commentId,req.body.reply, res.callback);
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
     * to add reply 
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
};
module.exports = _.assign(module.exports, controller);