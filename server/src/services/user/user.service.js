const {UserModel} = require('../../database');

class UserService {
    createUser(user) {
        const userToCreate = new UserModel(user);

        return userToCreate.save();
    }

    findOneByParams(params) {
        return UserModel.findOne(params);
    }
}

module.exports = new UserService();
