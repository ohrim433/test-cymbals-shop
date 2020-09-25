const {model, Schema} = require('mongoose');

const UserSchema = new Schema({
    // TODO enums
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, default: 'user'},
    age: {type: Number, required: true},
    phone: {type: String},
    gender: {type: String},
    createdAt: {type: Date, default: Date.now()},
    photo: {type: String},
    status: {type: String, required: true, default: 'pending'}
});

module.exports = model('user', UserSchema);
