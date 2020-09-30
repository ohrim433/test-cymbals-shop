const {hashPassword, tokenGenerator} = require('../../helpers');
const {newUserValidationSchema} = require('../../validators');
const {emailService, logService, userService} = require('../../services');
const {ActionsEnum, LogEnum, RequestHeadersEnum, ResponseStatusCodesEnum, UserStatusEnum} = require('../../constants');
const {ErrorHandler, customErrors} = require('../../errors');

class UserController {
    async createUser(req, res, next) {
        const user = req.body;
        const {error} = newUserValidationSchema.validate(user);

        if (error) {
            return next(new Error(error.details[0].message));
        }

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
}

module.exports = new UserController();
