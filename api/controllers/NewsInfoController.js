module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
              /**
     * for save vote
     */
 addVote: function (req, res) {
        if (req.body) {
            NewsInfo.addVote(req.body.pollname,req.body.newsId, res.callback);
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