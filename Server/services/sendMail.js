const nodemailer = require("nodemailer");
require('dotenv').config()


async function sendMail(email,subject,text,output) {
   

     
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
  
      let info = await transporter.sendMail({
        from: "CNSS",
        to: email,
        subject: subject,
        text: text,
        html: output,
      });
    } catch (error) {
      console.log(error);
    }
  }

  module.exports = {sendMail}