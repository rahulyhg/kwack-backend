var schema = new Schema({
    name: {
        type: String,
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Interests', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {


       searchInterests: function (data, callback) {
      var trimText = data.searchText.trim();
        var search = new RegExp('^' + trimText);

        var queryString = {
            name: {
                $regex: search,
                $options: "i"
            }
        }

        Interests.find(queryString).limit(5).exec(function (error, interestsFound) {
            if (error || interestsFound == undefined) {
                callback(error, null);
            } else {
                if (!_.isEmpty(interestsFound)) {
                    callback(null, interestsFound);
                } else {
                    callback(null, []);
                }
            }
        });
    },
     /**
     * this function for get all Interests list
     * @param {callback} callback function with err and response
     */
      getAllInterests: function (callback) {

        Interests.find({

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
};
module.exports = _.assign(module.exports, exports, model);
