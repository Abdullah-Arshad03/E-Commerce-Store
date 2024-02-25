const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const errorFunc = require("../utils/errorFunc");

const protectRoute = async (req, res, next) => {
  try {
    let token;
    let userId;
    let decodedToken

    token = req.cookies.jwt;

    if (!token) {
      errorFunc(401, "Not Authorized, no Token!");
    }
    
    try {
        decodedToken =  jwt.verify(token , process.env.JWT_SECRET)
    } catch (error) {
        console.log('error during decoding of the token', error)
        throw error
    }

    userId = decodedToken.userId
    let loggedInUser = await User.findById(userId).select('-password')

    req.user = loggedInUser
    console.log(loggedInUser)
    next()

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};


const admin = async (req, res, next)=>{
    try {

        if(req.user && req.user.isAdmin){
            next()
       }
       else{
          errorFunc(401 , 'Not Authorized as Admin')
       }
        
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500
        }
        next(error)
    }
}

module.exports = {
  protectRoute,
  admin
};
