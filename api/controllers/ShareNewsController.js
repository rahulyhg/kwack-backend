module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

     shareNewsOrNot: function (req, res) {
        if (req.body) {
            ShareNews.shareNewsOrNot(req.body.newsId,req.body.userId, res.callback);
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
     *  to add Follow and Following count for User
     */
    addShareCount: function (req, res) {
        if (req.body) {
            ShareNews.addShareCount(req.body.newsId, req.body.userId, res.callback);
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
