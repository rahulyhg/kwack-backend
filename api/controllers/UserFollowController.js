module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
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
            UserFollow.getAllFollowingName(req.body.userId, res.callback);
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
            UserFollow.addFollowerCount(req.body.userFollowed,req.body.userFollwing, res.callback);
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
            UserFollow.removeFollowerCount(req.body.userFollowed,req.body.userFollwing, res.callback);
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
