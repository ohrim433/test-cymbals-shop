const {userService} = require('../../services');

class UserController {
    async createUser(req, res, next) {
        const user = req.body;

        // TODO validate user

        // TODO hash password

        await userService.createUser(user);

        res.sendStatus(201);
    }
}

module.exports = new UserController();
