const {hashPassword, tokenGenerator} = require('../../helpers');
const {emailService, logService, userService} = require('../../services');
const {ActionsEnum, LogEnum, RequestHeadersEnum, ResponseStatusCodesEnum, UserStatusEnum} = require('../../constants');
const {ErrorHandler, customErrors} = require('../../errors');

class UserController {
    async createUser(req, res) {
        const user = req.body;

        user.password = await hashPassword(user.password);

        const {_id} = await userService.createUser(user);
        const {accessToken} = tokenGenerator(ActionsEnum.USER_REGISTER);

        await userService.addActionToken(_id, {action: ActionsEnum.USER_REGISTER, token: accessToken});
        await emailService.sendEmail(user.email, ActionsEnum.USER_REGISTER, {token: accessToken});
        await logService.createLog({event: LogEnum.USER_REGISTERED, userId: _id});

        res.sendStatus(ResponseStatusCodesEnum.CREATED);
    }

    async confirmUser(req, res, next) {
        const {_id, status, tokens = []} = req.user;
        const tokenToDelete = req.get(RequestHeadersEnum.AUTHORIZATION);

        if (status !== UserStatusEnum.PENDING) {
            return next(new ErrorHandler(
                ResponseStatusCodesEnum.BAD_REQUEST,
                customErrors.BAD_REQUEST_USER_ALREADY_ACTIVATED.message,
                customErrors.BAD_REQUEST_USER_ALREADY_ACTIVATED.code
            ));
        }

        await userService.updateUserByParams({_id}, {status: UserStatusEnum.CONFIRMED});

        const index = tokens.findIndex((
            {action, token}) => token === tokenToDelete && action === ActionsEnum.USER_REGISTER
        );

        if (index !== -1) {
            tokens.splice(index, 1);
            await userService.updateUserByParams({_id}, {tokens});
            await logService.createLog({event: LogEnum.USER_CONFIRMED, userId: _id});
        }

        res.end();
    }

    async forgotPassword(req, res) {
        const {_id, email} = req.user;
        const {accessToken} = tokenGenerator(ActionsEnum.FORGOT_PASSWORD);

        await userService.addActionToken(_id, {token: accessToken, action: ActionsEnum.FORGOT_PASSWORD});
        await emailService.sendEmail(email, ActionsEnum.FORGOT_PASSWORD, {token: accessToken});

        res.end();
    }

    async setForgotPassword(req, res) {
        const {_id, tokens = []} = req.user;
        const {password} = req.body;
        const tokenToDelete = req.get(RequestHeadersEnum.AUTHORIZATION);
        const hashedPassword = await hashPassword(password);

        await userService.updateUserByParams({_id}, {password: hashedPassword});

        const index = tokens.findIndex((
            {action, token}) => token === tokenToDelete && action === ActionsEnum.FORGOT_PASSWORD
        );

        if (index !== -1) {
            tokens.splice(index, 1);
            await userService.updateUserByParams({_id}, {tokens});
        }

        res.end();
    }
}

module.exports = new UserController();
