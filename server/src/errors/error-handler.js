module.exports = class ErrorHandler extends Error {
    name = 'Controller Error';
    status;
    message;
    customCode;

    constructor(status, message, customCode) {
        super(message);
        this.message = message;
        this.status = status;
        this.customCode = customCode;

        Error.captureStackTrace(this, this.constructor);
    }
};
