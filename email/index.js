"use strict";
const nodemailer = require("nodemailer");

async function sendMail( to, subject, html, text ) {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.ethereal.email",
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USERNAME || testAccount.user,
            pass: process.env.SMTP_PASSWORD || testAccount.pass,
        },
    });

    try {
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>',
            to: "bar@example.com, baz@example.com",
            subject: "Hello ✔",
            text: "Hello world?",
            html: require('./order_confirmation')({ status: 'confirmed', username: 'aman' }),
        });
    
        console.log("Message sent: %s", info.messageId);
    
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendMail