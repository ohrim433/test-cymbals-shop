const {AccessTokenModel} = require('../../database');

class AuthService {
    createTokenPair(tokenObject) {
        const tokensToCreate = new AccessTokenModel(tokenObject);

        return tokensToCreate.save();
    }

    async findUserByToken(findObject) {
        const tokenAndUser = await AccessTokenModel
            .findOne(findObject)
            .populate('userId')
            .select({userId: 1, _id: 0});

        return tokenAndUser.userId.toJSON();
    }

    removeToken(removeObject) {
        return AccessTokenModel.findOneAndDelete(removeObject);
    }
}

module.exports = new AuthService();
