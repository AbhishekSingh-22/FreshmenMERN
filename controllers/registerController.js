const path = require('path')
const User = require('../models/User.js')

const bcrypt = require('bcrypt')

const handleNewUser = async (req,res) =>{
    try {
        const { username, email, password, confirmPassword } = req.body
    
        if (!(username && email && password)){
            return res.json({"status":200,'message': 'Please provide both username and password'})
        }
    
        if (password !== confirmPassword) return res.json({"status":200, "message":"Confirm password is incorrect!"})
    
            //check for duplicate username
        let duplicateUser = await User.findOne({ email: email }).exec();
        if (duplicateUser) return res.json({"status":200, 'message': `User with email: ${email} already exists!`})
    
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


module.exports = {handleNewUser}
