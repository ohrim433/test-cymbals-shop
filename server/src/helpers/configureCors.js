const {config} = require('../config');

module.exports = (origin, callback) => {
    const whiteList = config.ALLOWED_ORIGIN.split(';');

    // For Postman
    if (!origin) {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new Error('Blocked by CORS'), false);
    }

    return callback(null, true);
};
