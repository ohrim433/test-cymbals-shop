const {hashPassword, tokenGenerator} = require('../../helpers');
const {newUserValidationSchema} = require('../../validators');
const {emailService, userService} = require('../../services');
const {ActionsEnum, ResponseStatusCodesEnum, UserStatusEnum} = require('../../constants');
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

        res.sendStatus(201);
    }

    async confirmUser(req, res, next) {
        const {_id, status} = req.user;

        if (status !== UserStatusEnum.PENDING) {
            return next(new ErrorHandler(
                ResponseStatusCodesEnum.BAD_REQUEST,
                customErrors.BAD_REQUEST_USER_ALREADY_ACTIVATED.message,
                customErrors.BAD_REQUEST_USER_ALREADY_ACTIVATED.code
            ));
        }

        await userService.updateUserByParams({_id}, {status: UserStatusEnum.CONFIRMED});

        res.end();
    }
}

module.exports = new UserController();
