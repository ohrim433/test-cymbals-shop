const {hashPassword} = require('../../helpers');
const {newUserValidationSchema} = require('../../validators');
const {userService} = require('../../services');

class UserController {
    async createUser(req, res, next) {
        const user = req.body;
        console.log(newUserValidationSchema);

        const {error} = newUserValidationSchema.validate(user);

        if (error) {
            return next(new Error(error.details[0].message));
        }

        user.password = await hashPassword(user.password);

        await userService.createUser(user);

        res.sendStatus(201);
    }
}

module.exports = new UserController();
