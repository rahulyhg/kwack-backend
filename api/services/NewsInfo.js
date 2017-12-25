var schema = new Schema({
    title: {
        type: String,

    },
    description: {
        type: String,

    },
    url: {
        type: String,

    },
    imageUrl: {
        type: String,

    },
    source: {
        type: String,

    },
    sourceId: {
        type: String,

    },
    sourceJson: {
        type: String,

    },


    pollOptions: [{
        title: {
            type: String
        },
        percentage: {
            type: Number,
            default: 0
        }
    }],


    pollQuestion: {
        type: String,

    },
    interests: [{
        name: String
    }],
    realTotalCount: {
        type: Number,
        default: 0
    },
    commentTotal: {
        type: Number,
        default: 0
    },
    comments: [{
        comment: {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            index: true
        }
    }],
    likeTotal: {
        type: Number,
        default: 0
    },
    Likes: [{
        like: {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            index: true
        }
    }],

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('NewsInfo', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    /**
     * this function for search All News
     * @param {callback} callback function with err and response
     */
    getAllNews: function (callback) {

        NewsInfo.find({}).exec(function (err, found) {
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
     * this function for news to add vote 
     * @param {pollname} input userEmail
     *  * @param {newsId} input newsId
     * @param {callback} callback function with err and response
     */
    addVote: function (pollname, newsId, callback) {
        if (pollname == 'YES') {
            NewsInfo.findOne({
                _id: newsId,
            }).exec(function (err, found) {
                if (err) {
                    callback(err, null);
                } else if (_.isEmpty(found.pollOptions)) {
                    callback("noDataound", null);
                }
                if (_.isEmpty(found.pollOptions)) {
                    var data1 = {}
                    data1.pollOptions = [];
                    data1.pollOptions.push({
                        name: "YES"
                    });

                    data1._id = found._id;
                    console.log("after pushing data into object", data1)
                    User.saveData(data1, function (err, created) {
                        if (err) {
                            callback(err, null);
                        } else if (_.isEmpty(created)) {
                            callback(null, "noDataound");
                        } else {
                            callback(null, created)
                        }

                    })
                } else {
                    if (found.pollOptions[0].title == 'YES') {
                        found.pollOptions[0].percentage = found.pollOptions[0].percentage + 1;

                    }
                    if (found.pollOptions[1]) {
                        if (found.pollOptions[1].title == 'YES') {

                        }
                    }

                    NewsInfo.saveData(found, function (err, data) {
                        if (err) {
                            console.log("error occured while updating payment status");
                        } else {
                            console.log("saved successfully");
                        }

                    })
                    callback(null, found);
                }

            });
        } else if (pollname == 'NO') {
            NewsInfo.findOne({
                _id: newsId,
            }).exec(function (err, found) {
                if (err) {
                    callback(err, null);
                } else if (_.isEmpty(found.pollOptions)) {
                    console.log("inside poll emapty", found);
                    var data1 = {}
                    data1.pollOptions = [];
                    data1.pollOptions.push({
                        name: "NO"
                    });
                    data1.pollOptions.push({
                        percentage: 1
                    });

                    NewsInfo.saveData(found, function (err, data) {
                        if (err) {
                            console.log("error occured while updating payment status");
                        } else {
                            console.log("saved successfully");
                        }

                    })
                    callback(null, found);
                } else {
                    if (found.pollOptions[0].title == 'NO') {
                        found.pollOptions[0].percentage = found.pollOptions[0].percentage + 1;

                    }
                    if (found.pollOptions[1]) {
                        if (found.pollOptions[1].title == 'NO') {
                            found.pollOptions[1].percentage = found.pollOptions[1].percentage + 1;
                        }
                    }

                    NewsInfo.saveData(found, function (err, data) {
                        if (err) {
                            console.log("error occured while updating payment status");
                        } else {
                            console.log("saved successfully");
                        }

                    })
                    callback(null, found);
                }

            });
        }

    },
};
module.exports = _.assign(module.exports, exports, model);