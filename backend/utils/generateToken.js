
const jwt = require('jsonwebtoken')


const generateToken = (res , userId , email) =>{
    const token = jwt.sign(
        { userId: userId.toString() , email: email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
  
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      });
}


module.exports = generateToken
