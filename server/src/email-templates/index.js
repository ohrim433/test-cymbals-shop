const {ActionsEnum} = require('../constants');

module.exports.htmlTemplates = {
    [ActionsEnum.USER_REGISTER]: {
        subject: 'Welcome',
        templateFileName: 'user-confirm'
    }
};
