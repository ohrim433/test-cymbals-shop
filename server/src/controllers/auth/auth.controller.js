const {compareHashedPassword, tokenGenerator} = require('../../helpers');
const {ActionsEnum, ResponseStatusCodesEnum, RequestHeadersEnum} = require('../../constants');
const {authService} = require('../../services');
const {customErrors, ErrorHandler} = require('../../errors');

class AuthController {
    async authUser(req, res, next) {
        try {
            const {_id, password} = req.user;
            const authInfo = req.body;
            const isPasswordsEqual = await compareHashedPassword(authInfo.password, password);

            if (!isPasswordsEqual) {
                return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND,
                    customErrors.NOT_FOUND.message));
            }

            const {accessToken, refreshToken} = tokenGenerator(ActionsEnum.USER_AUTH);

            await authService.createTokenPair({
                accessToken,
                refreshToken,
                userId: _id
            });

            res.json({accessToken, refreshToken});
        } catch (e) {
            return next(e);
        }
    }

    async logoutUser(req, res, next) {
        const accessToken = req.get(RequestHeadersEnum.AUTHORIZATION);

        await authService.removeToken({accessToken});

        res.sendStatus(ResponseStatusCodesEnum.NO_CONTENT);
    }
}

module.exports = new AuthController();
