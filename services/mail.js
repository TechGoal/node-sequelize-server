const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: process.env['mail_host'],
    port: process.env['mail_port'],
    service: process.env['mail_service'],
    secure: false,
    auth: {
        user: process.env['mail_user'],
        pass: process.env['mail_pass'],
    },
});

class Mail {
    constructor() { }
    static async send_mail(data) {
        const type = data.type;
        const mail_options = {
            from: process.env['mail_from'],
            to: data.to.join(),
            subject: data.subject || '',
            text: data.text || '',
            html: undefined,
        };
        return transporter.sendMail(mailOptions);
    }
}

module.exports = Mail;