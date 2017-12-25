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
var model = {};
module.exports = _.assign(module.exports, exports, model);