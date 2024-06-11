const Otp = require("../models/Otp.js");

const verifyOtp = async(req, res) => {
    const {username, otp} = req.body;
    if (!(username && otp)){
        return false; // resend otp
    }

    const OTP = await Otp.findOne({username: username});

    let currentTime = new Date();

    if (currentTime > OTP.expiryTime){
        return "OTP has been expired. Please sign up again"
    } 

    if (OTP.otp === otp){
        return true;
    }

    return "Wrong OTP";
}

module.exports = {verifyOtp};