const {newUserValidationSchema} = require('../../validators');

module.exports = (req, res, next) => {
    const {error} = newUserValidationSchema.validate(req.body);

    if (error) {
        return next(new Error(error.details[0].message));
    }

    next();
};
