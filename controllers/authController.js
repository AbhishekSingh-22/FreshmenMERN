const User = require('../models/User.js');
const cookieParser = require("cookie-parser")

const jwt = require('jsonwebtoken')
require('dotenv').config()

const bcrypt = require('bcrypt')

const handleLogin = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password){
        return res.status(400).json({'message': 'Please provide both email and password'})
    }

    const user = await User.findOne({email: email});

    if (!user) return res.status(404).json({"message":`No user with email: ${email} found`})

    const match = await bcrypt.compare(password, user.password)

    if (!match) return res.status(401).json({"message":`Wrong password`})

    let accessToken = user.generateAccessToken();
    let refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken,
    await user.save({validateBeforeSave: false})

    const loggedInUser = await User.findOne(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
    .status(200)
    .cookie("accessToken",accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({"message":"User Logged In!",
        "user":loggedInUser
    })
}


const handleLogout = async (req, res) =>{
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
   return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({"message":"User Logged Out!"})

}

const refreshAccessToken = async (req, res)=>{
    // match the cookie refreshToken with the refreshToken saved in DB
    // if match => true
    // then generate new access token and save in cookie

    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refershToken;
    if (!incomingRefreshToken) throw "Unauthorized Access"

    const decodedToken = await jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    );

    if(!decodedToken) throw "Invalid Token"

    const user = await User.findOne({_id: decodedToken._id}).select("-password")

    if (!user) throw "Invalid Token"

    if(incomingRefreshToken !== user.refreshToken) throw "Refresh Token is expired or invalid"

    let accessToken = user.generateAccessToken();
    let refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({"message":"Access token and Refresh Token Got Refreshed successfully!"})
}


module.exports = {handleLogin, handleLogout, refreshAccessToken}