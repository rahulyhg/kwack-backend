var schema = new Schema({
    user: {
   type: Schema.Types.ObjectId,
        ref: 'User'
        
    },
       news: {
        type: Schema.Types.ObjectId,
        ref: 'NewsInfo'
    },
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Readlogs', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);