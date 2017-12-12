module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    /**
     * for users to add poll and calculate the poll percentages 
     */
    addPoolAnswer: function (req, res) {
        async.waterfall([
            function (callback) {
                Pool.addPoolAnswer(req.body.newsId, req.body.optionId, req.body.userId, callback);
            },
            function (data, callback) {
                Pool.calculatePoolAnswer(req.body.newsId, callback);
            }
        ], res.callback);
    }
};
module.exports = _.assign(module.exports, controller);