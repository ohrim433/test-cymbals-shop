const nodemailer = require('nodemailer');
const path = require('path');
const EmailTemplates = require('email-templates');

const {config} = require('../../config');

const {ResponseStatusCodesEnum} = require('../../constants');
const {ErrorHandler} = require('../../errors');
const {htmlTemplates} = require('../../email-templates');

if (
    !config.FRONTEND_URL
    || !config.ROOT_EMAIL
    || !config.ROOT_EMAIL_SERVICE
    || !config.ROOT_EMAIL_PASSWORD
) {
    throw Error('Root email credentials are not defined!');
}

const contextExtension = {
    frontendUrl: config.FRONTEND_URL
};

const transporter = nodemailer.createTransport({
    service: config.ROOT_EMAIL_SERVICE,
    auth: {
        user: config.ROOT_EMAIL,
        pass: config.ROOT_EMAIL_PASSWORD
    }
});

const emailTemplates = new EmailTemplates({
    views: {
        root: path.resolve(process.cwd(), 'server', 'src', 'email-templates')
    }
});

class EmailService {
    async sendEmail(email, action, context) {
        const templateInfo = htmlTemplates[action];

        if (!templateInfo) {
            throw new ErrorHandler(ResponseStatusCodesEnum.SERVER, 'Template not found');
        }

        Object.assign(context, contextExtension);

        const html = await emailTemplates.render(templateInfo.templateFileName, context);
        const mailOptions = {
            from: `no reply <${config.ROOT_EMAIL}>`,
            to: email,
            subject: templateInfo.subject,
            html
        };

        await transporter.sendMail(mailOptions);
    }
}

module.exports = new EmailService();
