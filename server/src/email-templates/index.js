const {ActionsEnum} = require('../constants');

module.exports.htmlTemplates = {
    [ActionsEnum.USER_REGISTER]: {
        subject: 'Welcome',
        templateFileName: 'user-confirm'
    },
    [ActionsEnum.FORGOT_PASSWORD]: {
        subject: 'Forgot your password?',
        templateFileName: 'user-forgot-password'
    },
};
