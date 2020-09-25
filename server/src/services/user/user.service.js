const {UserModel} = require('../../database');

class UserService {
    createUser(user) {
        const userToCreate = new UserModel(user);

        return userToCreate.save();
    }
}

module.exports = new UserService();
