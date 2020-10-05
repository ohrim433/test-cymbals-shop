const {model, Schema} = require('mongoose');

const {TableNamesEnum} = require('../../constants');

const AccessTokenSchema = new Schema(
    {
        accessToken: {type: String, required: true},
        refreshToken: {type: String, required: true},
        userId: {type: Schema.Types.ObjectId, ref: TableNamesEnum.USER}
}, {
        timestamps: true
    });

module.exports = model(TableNamesEnum.ACCESS_TOKEN, AccessTokenSchema);
