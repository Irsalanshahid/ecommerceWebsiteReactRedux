const nodeMailer = require("nodeMailer");

const sendEmail = async(options)=>{
    const transporter = nodeMailer.createTransport({
        service:process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_MAIL,
            password:process.env.SMTP_PASSWORD
        }
    })

    const mailOptions = {
        from:process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
}