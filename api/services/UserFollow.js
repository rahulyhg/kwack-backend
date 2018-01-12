var schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userBeenFollowed: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('UserFollow', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    /**
     * this function add Follow and Following Count for User
     * @param {userFollowed} input userFollowed
     *  * @param {userFollwing} input userFollwing
     * @param {callback} callback function with err and response
     */

    addFollowerCount: function (userFollowed, userFollwing, callback) {

        async.waterfall([
            function (callback1) {
                var dataToSave = {}
                dataToSave.user = userFollowed
                dataToSave.userBeenFollowed = userFollwing
                UserFollow.saveData(dataToSave, function (err, created) {
                    if (err) {
                        callback(err, null);
                    } else if (_.isEmpty(created)) {
                        callback(null, "noDataound");
                    } else {
                        userData = {}
                        userData.userFollowed = userFollowed;
                        userData.userFollwing = userFollwing;
                        callback1(null, userData);
                    }
                });
            },
            function (datain, callback2) {
                User.findOne({
                    _id: datain.userFollowed
                }).exec(function (err, found) {
                    if (err) {
                        callback2(err, null);
                    } else if (_.isEmpty(found)) {
                        callback2("noDataound", null);
                    } else {
                        var data2 = {}
                        data2._id = found._id;
                        data2.followCount = found.followCount + 1
                        User.saveData(data2, function (err, created) {
                            if (err) {
                                callback2(err, null);
                            } else if (_.isEmpty(created)) {
                                callback2(null, "noDataound");
                            } else {

                                callback2(null, datain);
                            }
                        });
                    }

                })

            },
            function (data, callback3) {
                User.findOne({
                    _id: data.userFollwing
                }).exec(function (err, found) {
                    if (err) {
                        callback3(err, null);
                    } else if (_.isEmpty(found)) {
                        callback3("noDataound", null);
                    } else {
                        var data2 = {}
                        data2._id = found._id;
                        data2.followingCount = found.followingCount + 1
                        User.saveData(data2, function (err, created) {
                            if (err) {
                                callback3(err, null);
                            } else if (_.isEmpty(created)) {
                                callback3(null, "noDataound");
                            } else {

                                callback3(null, created);
                            }
                        });
                    }

                })

            },
        ], function (err, data) {

            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                callback(null, data)
            }
        });
    },


};
module.exports = _.assign(module.exports, exports, model);