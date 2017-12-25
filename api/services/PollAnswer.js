var schema = new Schema({
    user: {
   type: Schema.Types.ObjectId,
        ref: 'User'
        
    },
     news: {
        type: String
        
    },
  pollOptions: [{
        option: {
            type: String
        }
    }],
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('PollAnswer', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
      /**
     * this function provides details about the poll
     * @param {newsId} input newsId
     * @param {callback} callback function with err and response
     */
    getPoll: function (newsId, callback) {
         PollAnswer.findOne({
                    _id: newsId
                }).exec(function (err, found) {
                    if (err) {
                        callback3(err, null);
                    } else if (_.isEmpty(found)) {
                        callback3("noDataound", null);
                    } else {
                        callback3(null, found);
                    }

                })
    },
        /**
     * this function provides details about the poll
     * @param {newsId} input newsId
     * @param {optionId} input optionId
     * @param {userId} input userId
     * @param {callback} callback function with err and response
     */
    addPollAnswer: function (newsId, optionId, userId, callback) {
        var pollAnswerObj = PoolAnswer();
        pollAnswerObj.news = newsId;
        pollAnswerObj.option = userId;
         pollAnswerObj.user = userId;
        pollAnswerObj.save(callback);
    },
};
module.exports = _.assign(module.exports, exports, model);