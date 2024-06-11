const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text){
        const auth = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth : {
                user: "discoverfreshmen@gmail.com",
                pass: process.env.APP_PASSWORD
            }
        });
    
        const receiver = {
            from : "discoverfreshmen@gmail.com",
            to : to,
            subject: subject,
            text: text
        }
    
        try {
            const response = await auth.sendMail(receiver);
            console.log("email sent successfully")
        } catch (error) {
            console.log(error)
        }
}

module.exports = sendEmail;