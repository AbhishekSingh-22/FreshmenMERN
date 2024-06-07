const jwt = require("jsonwebtoken");
const User = require("../models/User.js")

const verifyJWT = async(req, res, next) =>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if (!token){
            throw "Unauthorized access"
        }
            
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findOne({_id: decodedToken?._id}).select("-password -refreshToken");
    
        if (!user) throw "Invalid Access Token"
        
        req.user = user;
    
        next(); 
    } catch (error) {
        return res.status(401).json({
            "payload": "Unauthorized",
            "message":`Invalid Access Token and error:${error}`})
    }
}

async function isAuthenticated(req, res, next) {
    try {
      await verifyJWT(req, res, () => { // Pass an empty callback for verification only
        req.isAuthenticated = true;
        next();
      });
    } catch (error) {
        try {
          fetch('http://localhost:3500/auth/refresh-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' // Optional, but recommended
            }
          })
          .then(response => {
            // Handle the response
            req.isAuthenticated = true;
            next();
          })
          .catch(error => {
            // Handle errors
            req.isAuthenticated = false;
            next();
          });
        } catch (error) {
          req.isAuthenticated = false;
          next();
        }
    }
  }


module.exports = {verifyJWT, isAuthenticated};