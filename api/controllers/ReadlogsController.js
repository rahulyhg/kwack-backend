
module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

             /**
     *  to add readlogs and count 
     */
 readLogs: function (req, res) {
        if (req.body) {
            Readlogs.readLogs(req.body.userId,req.body.newsId, res.callback);
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
