const {Types} = require('mongoose');

const {UserModel} = require('../../database');

class UserService {
    createUser(user) {
        const userToCreate = new UserModel(user);

        return userToCreate.save();
    }

    addActionToken(id, tokenObject) {
        return UserModel.update(
            {_id: Types.ObjectId(id)},
            {
                $push: {
                    tokens: tokenObject
                }
            }
        );
    }

    findOneByParams(params) {
        return UserModel.findOne(params);
    }

    findUserByActionToken(action, token) {
        return UserModel.findOne({
            $and: [
                {'tokens.action': action},
                {'tokens.token': token}
            ]
        });
    }

    updateUserByParams(params, update) {
        return UserModel.updateOne(params, update, {new: true});
    }
}

module.exports = new UserService();
