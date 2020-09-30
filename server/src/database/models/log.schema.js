const {model, Schema} = require('mongoose');

const {TableNamesEnum} = require('../../constants');

const LogSchema = new Schema({
    event: {type: String, required: true},
    userId: {type: String, required: true},
    data: Schema.Types.Mixed
},
{
    timestamps: true
});

module.exports = model(TableNamesEnum.LOGS, LogSchema);
