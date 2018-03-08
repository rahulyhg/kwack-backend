var schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'

    },
    news: {
        type: Schema.Types.ObjectId,
        ref: 'NewsInfo'
    },
    option: [{
        name: String
    }],
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('ShareNews', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    shareNewsOrNot: function (newsId, userId, callback) {
        console.log("***********", newsId, userId)
        ShareNews.findOne({
            news: newsId,
            user: userId
        }).exec(function (err, found) {
            // console.log("inside api found gwt kwack", found)
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback("noDataound", null);
            } else {
                callback(null, found);
            }

        })
    },


    /**
     * this function add Follow and Following Count for User
     * @param {userFollowed} input userFollowed
     *  * @param {userFollwing} input userFollwing
     * @param {callback} callback function with err and response
     */

    addShareCount: function (newsId, userId, callback) {
        console.log("***********************", newsId, userId)
        var dataToSave = {}
        dataToSave.news = newsId
        dataToSave.user = userId
        async.waterfall([
            function (callback1) {


                ShareNews.saveData(dataToSave, function (err, created) {
                    if (err) {
                        callback(err, null);
                    } else if (_.isEmpty(created)) {
                        callback(null, "noDataound");
                    } else {
                        data1 = {}
                        data1._id = created._id,
                            data1.newsId = newsId
                        callback1(null, data1);
                    }
                });
            },
            function (datain, callback2) {
                console.log("&&&&&&&&&&&&&&&&", dataToSave.newsId, datain._id)
                NewsInfo.update({
                    _id: datain.newsId
                }, {
                    $push: {
                        'shareNewsCount': {
                            sharenews: datain._id
                        }
                    }
                }).exec(function (err, found) {
                    if (err) {
                        callback2(err, null);
                    } else if (_.isEmpty(found)) {
                        callback2("noDataound", null);
                    } else {
                        callback2(null, found);
                    }

                });

            },

        ], function (err, data) {

            if (err || _.isEmpty(data)) {
                callback(err, []);
            } else {
                callback(null, data);
            }
        });
    },
};
module.exports = _.assign(module.exports, exports, model);