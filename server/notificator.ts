import * as dotenv from 'dotenv';
import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';

const email = process.env.MAIL_ADRESS;
const pass = process.env.EMAIL_PASS;

export class MailNotificator {

  constructor() {

  }

sendMail = (req, res) => {

  const transporter = nodemailer.createTransport(smtpTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: email,
        pass: pass
      },
      tls: {
        rejectUnauthorized: false
      }
    })
  );
  const mailOptions = {
    from: '<' + req.body.email + '>',
    to: '<' + email + '>',
    subject: req.body.username + ' через приложение Node.js',
    html: '<b>from ' + req.body.email + '</b> </br> <p>' + req.body.message + '<p>'
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
      return res.sendStatus(504);
    }else {
      // console.log('message sent at mail server');
      return res.sendStatus(200);
    }
  });

}


}

export default MailNotificator;




