const {model, Schema} = require('mongoose');

const {TableNamesEnum, UserRolesEnum, UserStatusEnum} = require('../../constants');

const UserSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, default: UserRolesEnum.USER},
    age: {type: Number, required: true},
    phone: {type: String},
    gender: {type: String},
    photo: {type: String},
    status: {type: String, required: true, default: UserStatusEnum.PENDING},
    tokens: [{
        token: {type: String},
        action: {type: String}
    }]
},
{
    timestamps: true
});

module.exports = model(TableNamesEnum.USER, UserSchema);
