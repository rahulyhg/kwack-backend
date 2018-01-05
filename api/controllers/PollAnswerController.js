module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
              /**
     * for get all PollAnswer
     */
 getAllPoll: function (req, res) {
        if (req.body) {
            PollAnswer.getAllPoll(res.callback);
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
     * for get all PollAnswer
     */
 getPoll: function (req, res) {
        if (req.body) {
            PollAnswer.getPoll(req.body.newsId,req.body.userId, res.callback);
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
     * for add PollAnswer
     */
 addPollAnswer: function (req, res) {
        if (req.body) {
            PollAnswer.addPollAnswer(req.body.newsId, req.body.pollname,req.body.userId,res.callback);
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
