const nodeMailer = require("nodeMailer");

const sendEmail = async (options) => {
  console.log(
    process.env.SMTP_SERVICE + process.env.SMTP_MAIL + process.env.SMTP_PASSWORD
  );
  const transporter = nodeMailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
