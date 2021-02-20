const nodemailer = require('nodemailer');

const auth = require('../../secretKey');

module.exports.mailService = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let testAccount = await nodemailer.createTestAccount();

      let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: auth.EMAIL_ADDRESS,
          pass: auth.PASSWORD,
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: auth.EMAIL_ADDRESS, // sender address
        to: email, // list of receivers
        subject: 'Forget password', // Subject line
        html: `<a href='http://localhost:3000/newPassword?email=${email}' > click here for add new password </a>`,
      });

      console.log('Message sent: %s', info.messageId);

      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      resolve({status: true, msg: 'link successfully sended to your mail'});
    } catch (error) {
        reject(error)
    }
  });
};
