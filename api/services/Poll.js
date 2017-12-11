var model = {
    /**
     * this function provides details about the poll
     * @param {newsId} input newsId
     * @param {callback} callback function with err and response
     */
    getPool: function (newsId, callback) {
        News.finOne({
            _id: poolId
        }, callback);
    },
    /**
     * this function provides details about the poll
     * @param {newsId} input newsId
     * @param {optionId} input optionId
     * @param {userId} input userId
     * @param {callback} callback function with err and response
     */
    addPoolAnswer: function (newsId, optionId, userId, callback) {
        var pollAnswerObj = PoolAnswer();
        poolAnswerObj.news = newsId;
        poolAnswerObj.option = userId;
        poolAnswerObj.user = userId;
        poolAnswerObj.save(callback);
    },
    /**
     * this function provides details about the poll
     * @param {newsId} input newsId
     * @param {callback} callback function with err and response
     */
    calculatePoolAnswer: function (newsId, callback) {
        asycn.waterfall([
            function (callback) { // find the total number of results per options

            },
            function (data, callback) { // save the values in the news table

            }
        ], callback);
        // Aggregate to find counts per Option
        //
    }
};
module.exports = model;