module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

    getOneUserDetail: function (req, res) {
        if (req.body) {
            UserFollow.getOneUserDetail(req.body.userId, req.body.GetUserId, req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getAllFollwersNameForInviteFrnd: function (req, res) {
        if (req.body) {
            UserFollow.getAllFollwersNameForInviteFrnd(req.body.userId, req.body.userFollower, req.body, res.callback);
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
     * for get all User
     */
    getAllUser: function (req, res) {
        if (req.body) {
            UserFollow.getAllUser(req.body.userId, req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
    areBothFollowing: function (req, res) {
        if (req.body) {
            UserFollow.areBothFollowing(req.body.user, req.body.userBeenFollowed, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },


        getAllFollowingNameWithoutPaggination: function (req, res) {
        if (req.body) {
            UserFollow.getAllFollowingNameWithoutPaggination(req.body.userId, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getAllFollowerName: function (req, res) {
        if (req.body) {
            UserFollow.getAllFollowerName(req.body.userId, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
    getAllFollowingName: function (req, res) {
        if (req.body) {
            UserFollow.getAllFollowingName(req.body.userId,req.body, res.callback);
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
     *  to add Follow and Following count for User
     */
    addFollowerCount: function (req, res) {
        if (req.body) {
            UserFollow.addFollowerCount(req.body.userFollowed, req.body.userFollwing, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
    removeFollowerCount: function (req, res) {
        if (req.body) {
            UserFollow.removeFollowerCount(req.body.userFollowed, req.body.userFollwing, res.callback);
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