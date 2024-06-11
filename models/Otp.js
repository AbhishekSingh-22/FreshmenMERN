const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User.js")

const OtpSchema = new Schema({
    otp: {
        type: String,
        required: true,
        trim: true
    },
    username:{
        type: String
    },
    expiryTime:{
        type: Date
    }
},{
    timestamps: true
})

OtpSchema.methods.generateOTP = function(){
    let otp = '';
    const nums = "0123456789";

    for (let i=0; i<6; i++){
        otp += nums[Math.floor(Math.random()*6)]
    }

    return otp;
}

const Otp = mongoose.model('Otp',OtpSchema);

module.exports = Otp;