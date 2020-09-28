const nodemailer = require('nodemailer');
const path = require('path');
const EmailTemplates = require('email-templates');

const {config} = require('../../config');

const {ActionsEnum} = require('../../constants');
const {ErrorHandler} = require('../../errors');
const {htmlTemplates} = require('../../email-templates');

const contextExtension = {
    frontendUrl: config.FRONTEND_URL
};

const transporter = nodemailer.createTransport({
    service: config.ROOT_EMAIL_SERVICE,
    auth: {
        user: config.ROOT_EMAIL,
        password: config.ROOT_EMAIL_PASSWORD
    }
});

const emailTemplates = new EmailTemplates({
    views: {
        root: path.resolve(process.cwd(), 'email-templates', 'templates')
    }
});

class EmailService {
    async sendEmail(email, action, context) {
        const templateInfo = htmlTemplates[action];

        if (!templateInfo) {
            throw new ErrorHandler(500, 'Template not found');
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
