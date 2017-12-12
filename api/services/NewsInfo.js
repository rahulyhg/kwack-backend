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
        type: Number,

    },
      sourceJson: {
        type: String,

    },
    pollOptions: [{
        title: {
            type: String
        },
        percentage: {
            type: String
        }

    }],
    pollQuestion: {
        type: String,

    },
    interests: [{
        name: String
    }],
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('NewsInfo', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);