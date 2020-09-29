const {model, Schema} = require('mongoose');

const {UserRolesEnum, UserStatusEnum} = require('../../constants');

const UserSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, default: UserRolesEnum.USER},
    age: {type: Number, required: true},
    phone: {type: String},
    gender: {type: String},
    createdAt: {type: Date, default: Date.now()},
    photo: {type: String},
    status: {type: String, required: true, default: UserStatusEnum.PENDING},
    tokens: [{
        token: {type: String},
        action: {type: String}
    }]
});

module.exports = model('user', UserSchema);
