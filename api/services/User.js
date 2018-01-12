var schema = new Schema({
    name: {
        type: String,
    },
    userName: {
        type: String,
    },
    age: {
        type: String,
    },
     bio: {
        type: String,
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    location: {
        type: String,
    },
    email: {
        type: String,
        validate: validators.isEmail(),
        excel: "User Email",
    },

    userPollTotal: {
        type: Number,
    },
    usernewstotal: {
        type: Number,
    },
    followCount: {
         type: Number,
        default: 0
    },
    followingCount: {
         type: Number,
        default: 0
    },
    inviteFrinend: [{
        id: {
            type: String,
        },
        name: {
            type: String,
        },
        source: {
            type: String,
        },
        email: {
            type: String,
        },
    }],
    interests: [{
        name: String
    }],
    locations: [{
        locName: String
    }],
    dob: {
        type: Date,
        excel: {
            name: "Birthday",
            modify: function (val, data) {
                return moment(val).format("MMM DD YYYY");
            }
        }
    },
    photo: {
        type: String,
        default: "",
        excel: [{
            name: "Photo Val"
        }, {
            name: "Photo String",
            modify: function (val, data) {
                return "http://abc/" + val;
            }
        }, {
            name: "Photo Kebab",
            modify: function (val, data) {
                return data.name + " " + moment(data.dob).format("MMM DD YYYY");
            }
        }]
    },
    password: {
        type: String,
        default: ""
    },
    forgotPassword: {
        type: String,
        default: ""
    },
    mobile: {
        type: String,
        unique: true,
    },
    otp: {
        type: String,
        default: ""
    },
    accessToken: {
        type: [String],
        index: true
    },
    googleAccessToken: String,
    googleRefreshToken: String,
    oauthLogin: {
        type: [{
            socialId: String,
            socialProvider: String
        }],
        index: true
    },
    accessLevel: {
        type: String,
        default: "User",
        enum: ['User', 'Admin']


    }
});

schema.plugin(deepPopulate, {
    populate: {
        'user': {
            select: 'name _id'
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('User', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "user", "user"));
var model = {

    /**
     * this function for send otp
     * @param {email} input email
     * @param {callback} callback function with err and response
     */
    sendOtp: function (email, callback) {
        console.log("inside send otp", email)
        var emailOtp = (Math.random() + "").substring(2, 6);
        var foundData = {};
        User.findOneAndUpdate({
            email: email
        }, {
            otp: emailOtp
        }, {
            new: true
        }).exec(function (err, found) {
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
     * this function for verify otp
     * @param {otp} input otp
     * @param {callback} callback function with err and response
     */
    verifyOTPForResetPass: function (otp, callback) {
        User.findOne({
            otp: otp
        }).exec(function (error, found) {
            if (error || found == undefined) {
                callback(error, null);
            } else {
                if (_.isEmpty(found)) {
                    callback(null, {
                        message: "No data found"
                    });
                } else {
                    callback(null, found);
                }
            }
        })
    },

    /**
     * this function for get user by email
     * @param {userEmail} input userEmail
     * @param {callback} callback function with err and response
     */
    getUser: function (userEmail, callback) {

        User.findOne({
            email: userEmail,
        }).exec(function (err, found) {
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
     * this function for users to verify Account 
     * @param {userEmail} input userEmail
     * * @param {password} input password
     * @param {callback} callback function with err and response
     */
    VerifyUser: function (userEmail, password, callback) {

        User.findOne({
            email: userEmail,
            password: password
        }).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback("noDataound", null);
            } else {
                callback(null, found);
            }

        });
    },
   //This is api for add intrest
    demo: function (id, interest, callback) {
        console.log("id and intrest is",id,interest)

          User.findOneAndUpdate({
            _id: ObjectId(id)
        }, {
            $push: {
                interests: {
                    $each:interest
                }
            }
        }).exec(function (err, found) {
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
     * this function add details about the user interests
     * @param {newsId} input newsId
     *  * @param {interests} input interests
     * @param {callback} callback function with err and response
     */
    addInterests: function (userId, interest, callback) {
        var data1 = {}
        data1.interests = [];
        for (var idx = 0; idx < interest.length; idx++) {
            data1.interests.push({
                name: interest[idx].name,
            });
        }
        User.findOneAndUpdate({
            _id: ObjectId(data._id)
        }, {
            $push: {
                interests: {
                    $each: data.interests
                }
            }
        }).exec(callback);
        data1._id = userId;
        User.saveData(data1, function (err, created) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(created)) {
                callback(null, "noDataound");
            } else {
                callback(null, created)
            }

        })
    },
    /**
     * this function remove details about the user interests
     * @param {newsId} input newsId
     *  * @param {interests} input interests
     * @param {callback} callback function with err and response
     */
    removeInterests: function (userId, interests, callback) {
        console.log("inside reove api0", userId, interests)
        User.update({
            _id: userId
        }, {
            $pull: {
                'interests': {
                    name: interests
                }
            }
        }).exec(function (err, found) {
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
     * this function add details about the user location
     * @param {newsId} input newsId
     *  * @param {locations} input locations
     * @param {callback} callback function with err and response
     */

    addLocations: function (userId, locations, callback) {
        User.Update({
            _id: mongoose.Types.ObjectId(userId)
        }, {
            $push: {
                'locations': {
                    locName: locations
                }
            }
        }).exec(function (err, found) {
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
     * this function remove details about the user location
     * @param {newsId} input newsId
     * @param {callback} callback function with err and response
     */
    removeLocations: function (userId, locations, callback) {
        User.Update({
            _id: mongoose.Types.ObjectId(userId)
        }, {
            $pull: {
                'locations': {
                    locName: locations
                }
            }
        }).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback("noDataound", null);
            } else {
                callback(null, found);
            }

        });
    },
    add: function () {
        var sum = 0;
        _.each(arguments, function (arg) {
            sum += arg;
        });
        return sum;
    },
    existsSocial: function (user, callback) {
        console.log("inside existsocial000000000000000000000000000", user)
        var Model = this;
        var userEmail = '';
        Model.findOne({

            "oauthLogin.socialId": user.id,
            "oauthLogin.socialProvider": user.provider,
        }).exec(function (err, data) {
            if (err) {
                callback(err, data);
            } else if (_.isEmpty(data)) {
                if (user.emails && user.emails.length > 0) {
                    userEmail = user.emails[0].value;

                }
                Model.findOne({
                    'emailId': userEmail
                }, function (err, userData) {
                    if (err) {
                        console.log(err);
                    }
                    if (_.isEmpty(userData)) {
                        var modelUser = {
                            name: user.displayName,
                            email: userEmail,
                            accessToken: [uid(16)],
                            loginProvider: user.provider,
                            oauthLogin: [{
                                socialId: user.id,
                                socialProvider: user.provider,
                            }]
                        };

                        modelUser.socialAccessToken = user.AccessToken;
                        modelUser.socialRefreshToken = user.RefreshToken;
                        if (user.image && user.image.url) {
                            modelUser.photo = user.image.url;
                        }
                        Model.saveData(modelUser, function (err, data2) {
                            if (err) {
                                callback(err, data2);
                            } else {
                                data3 = data2.toObject();
                                delete data3.oauthLogin;
                                delete data3.password;
                                delete data3.forgotPassword;
                                delete data3.otp;
                                callback(err, data3);
                            }
                        });
                    } else {
                        console.log(userData.oauthLogin);
                        userData.oauthLogin.push({
                            socialId: user.id,
                            socialProvider: user.provider
                        });
                        userData.loginProvider = user.provider;
                        userData.socialAccessToken = user.AccessToken;
                        userData.socialRefreshToken = user.RefreshToken;
                        userData.save(function (err, savedData) {
                            delete savedData.oauthLogin;
                            delete savedData.password;
                            delete savedData.forgotPassword;
                            delete savedData.otp;
                            callback(err, savedData);
                        });
                    }
                });


            } else {
                delete data.oauthLogin;
                delete data.password;
                delete data.forgotPassword;
                delete data.otp;

                console.log(" ============ user.googleAccessToken", user.AccessToken);
                data.loginProvider = user.provider;
                data.socialAccessToken = user.AccessToken;
                data.save(function () {});
                callback(err, data);
            }
        });
    },
    profile: function (data, callback, getGoogle) {
        var str = "name email photo mobile accessLevel loginProvider";
        if (getGoogle) {
            str += " googleAccessToken googleRefreshToken";
        }
        User.findOne({
            accessToken: data.accessToken
        }, str).exec(function (err, data) {
            if (err) {
                callback(err);
            } else if (data) {
                callback(null, data);
            } else {
                callback("No Data Found", data);
            }
        });
    },
    updateAccessToken: function (id, accessToken) {
        User.findOne({
            "_id": id
        }).exec(function (err, data) {
            data.googleAccessToken = accessToken;
            data.save(function () {});
        });
    },
    /**
     * This function get all the media from the id.
     * @param {userId} data
     * @param {callback} callback
     * @returns  that number, plus one.
     */
    getAllMedia: function (data, callback) {

    }
};
module.exports = _.assign(module.exports, exports, model);