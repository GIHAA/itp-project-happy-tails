const nodemailer = require("nodemailer");
require('dotenv').config();

const sendEmail = async (req, res) => {
  const { sub , email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: "Happy Tails",
    to: email,
    subject: sub,
    html: message,
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
};

module.exports = {
  sendEmail,
};
