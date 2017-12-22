module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

 globalSearch: function (req, res) {
        var searchResult = {};
        async.parallel({
            getInterests: function (cb) {
                Interests.searchInterests(req.body, function (error, data) {
                    if (error || data == undefined) {
                        cb(error, null);
                    } else {
                        searchResult.Interests = data;
                        cb();
                    }
                })
            }
        }, function (error) {
            if (error) {
                res.callback(error, null);
            } else {
                res.callback(null, searchResult);
            }
        })
    },


            /**
     * for get all Interests list
     */
 getAllInterests: function (req, res) {
        if (req.body) {
            Interests.getAllInterests(res.callback);
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
