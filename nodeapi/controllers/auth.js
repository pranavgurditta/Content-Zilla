const User= require("../models/user");
const jwt= require('jsonwebtoken');
require('dotenv').config() 
const expressJwt=require('express-jwt');
exports.signup= async (req,res)=>{
    const userExists=await User.findOne({email:req.body.email});
    if(userExists) {
        return res.status(403).json({
        error:"Email is already taken"});}
    const user=await new User(req.body);
    await user.save();
    res.status(200).json({message:"Sign up successful"});
  
};



exports.signin= async (req,res)=>{
    //find user based on email

    const {email,password}=req.body;
    User.findOne({email},(err,user)=>{
        if(err|| !user)
        {
            return res.status(400).json({
                error:"User with this email does not exist.Please sign in"
            })

        }
        //if user is found make sure the email and password match
        //go to user model and write a method that checks if password matches the email id we get
        if(!user.authenticate(password))
        {
            return res.status(401).json({
                error:"Email and password do not match"
            })
        }

    
    //authenticate

    //if error or no user
    
    //generate a cookie (token) with user id and secret
    const token=jwt.sign({_id: user._id},process.env.JWT_SECRET);


    //persist  the token as t in cookie with expiry date
    res.cookie("t",token,{expire:new Date()+9999})
    //return response with user and token to  frontend client
    const {_id,name,email}=user
    return res.json({token,user:{_id,email,name}});
    });
    };

    exports.signout= (req,res)=>{
        res.clearCookie("t");
        return res.json({message:"Signed out successfully"})
    }

exports.requireSignin=expressJwt({
    //if token is valid , then express jwt appends thhe verified user is in an auth key to request object
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});








/* for user sign up this controller is being made
async ,await makes it easy to write code
async is written infront of function
await is used since userExists or not to check this it takes some amoun t of time hence await is used
await User.findOne() is used to find any one user based on email or any other attribute
jsonwebtoken is used to assign a token each time user logs in and we install it , we will store it in web browser's local storage to maintain user is logged in or not
we want to import some variable from the dotenv file and hence we require dotenv.config

with combination of user Id and JWT sectet we will create a token that will be created to check if a user is logged in or not

 we use cookie-parser to access cookies , hence use npm i cookie-parser
*/

