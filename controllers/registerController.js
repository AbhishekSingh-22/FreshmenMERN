const User = require('../models/User.js')
const Otp = require("../models/Otp.js")
const sendEmail = require("../email/emailFunctionality.js")

const bcrypt = require('bcrypt')

const handleNewUser = async (req,res) =>{
    try {
        const { username, email, password, confirmPassword } = req.body
    
        if (!(username && email && password)){
            return res.json({"status":200,'message': 'Please provide both username and password'})
        }
    
        if (password !== confirmPassword) return res.json({"status":200, "message":"Confirm password is incorrect!"})
    
        // Check for duplicate username
        let duplicateUser = await User.findOne({ email: email}).exec();
        if (duplicateUser) return res.json({"status":200, 'message': `User with email: ${email} already exists!`})

        // ********************** Email verification via OTP **********************
        // find dupliacate otp for the user with username
        // delete that otp and create new one
        // save into model
        // send otp via mail
        // post it in otp verification api
        // if correct otp then proceed
        // otherwise keep continuing(looping)

        // *************** to be continued **************** 
    
        try{
            // hashing the pwd
            const hashedPwd = await bcrypt.hash(password, 10)
    
            // store the new user
            const newUser= new User({
                username: username,
                email : email,
                password:hashedPwd,
                // first_name : first_name,
                // last_name : last_name
            })
            const savedUser = await newUser.save();
            console.log('User saved:', savedUser);
            return res.status(201).json({"status":201,'message':`New user ${username} created`})
    
        }catch(err){
            res.status(500).json({'message':err.message});
        }
    } catch (error) {
        return res.json({"error": error})
    }
    
}

// const sendOtp = async (req,res, username, email) => {
//     try {
//         const otp = Otp.generateOTP();
    
//         const expiryTime = new Date();
//         expiryTime.setMinutes(expiryTime.getMinutes() + 10); 
    
//         const newOtp = new Otp({
//             otp: otp,
//             username: username,
//             expiryTime: expiryTime
    
//         })
        
//         const savedOtp = await newOtp.save({validateBeforeSave: false});

//         const sentemail = await sendEmail("discoverfreshmen@gmail.com", email, "OTP Verification", `Here is the otp for the email verifcation ${otp}. It will be valid for 10 minutes.`)
//         return sentemail

//     } catch (error) {
//         console.log(error)
//         console.log("Something went wrong while sendingOtp");
//     }
// }

// const validateOtp = async (req, res, username) =>{
//     const otp = await Otp.findOne({username: username});
//     const currentTime = new Date();

//     if (currentTime > otp.expiryTime){
//         return false
//     } 
    
//     const {OTP} = req.body;

//     if (OTP === otp.otp){
//         return true;
//     }

//     return false
// }



module.exports = {handleNewUser}
