var nodemailer = require('nodemailer');
// var pug = require('pug');
// import * as fs from 'fs';
// import * as path from 'path';

/** Models */
import {config} from '../../config'


export class MailService {
    private transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport(config.mail);
    }

    /**
     * Send an email with the provided subject and text.
     */
    public send(to: any, from: any, subject: any, text: any): boolean {
        var mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: text
        };
        this.transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent', info.messageId, info.response, ' | email: ', to);
        });
        return true;
    };


}
