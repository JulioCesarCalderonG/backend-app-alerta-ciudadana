require('dotenv').config();
const nodemailer = require("nodemailer");
const colors = require('colors');
const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.USER_EMAIL, // generated ethereal user
      pass: process.env.USER_PASSWORD, // generated ethereal password
    },
});

transport.verify().then(()=>{
    console.log('===================NODEMAILER CONFIG====================='.info);
    console.log(`STATUS: ${colors.green('ONLINE')}`);
    console.log(`MESSAGE: ${colors.green('MAILER CONNECT!!')}`);
}).catch((error)=>{
    console.log('===================NODEMAILER CONFIG====================='.error);
    console.log(`STATUS: ${colors.grey('OFFLINE')}`);
    console.log(`MESSAGE: ${colors.grey(error)}`);
});

module.exports = transport;