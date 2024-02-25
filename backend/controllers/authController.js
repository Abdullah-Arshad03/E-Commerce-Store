const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorFunc = require('../utils/errorFunc')

//    desp   :  login the user / get Token,
//    route  :  POST / api/auth/login
//    access :  Public
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      errorFunc(401, "Invalid Email or Password!");
    }

    const passEqual = await bcrypt.compare(password, user.password);

    if (!passEqual) {
      errorFunc(401, "Invalid Email or Password!");
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
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

    res.status(200).json({
      _id: user._id,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};



//    desp   :  Create New User,
//    route  :  POST / api/auth/register
//    access :  Public
exports.registerUser = async (req, res, next) => {
  res.send("in the registerUser route");
};



//    desp   :  login the user/ Clear Cookie,
//    route  :  POST / api/auth/logout
//    access :  Private
exports.logoutUser = async (req, res, next) => {

    res.cookie('jwt' , '' ,{
        httpOnly : true,
        expiresIn : new Date(0)
    })

    res.status(200).json({
        message : 'Logged Out!'
    })

};
