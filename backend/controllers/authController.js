const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorFunc = require("../utils/errorFunc");
const catchError = require('../utils/catchError')
const generateToken = require("../utils/generateToken")

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

  // generate jwt
  generateToken(res , user._id , user.email)

    res.status(200).json({
        message : 'User loggedIn Successfully!',
      _id: user._id,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    catchError(error, next)
  }
};

//    desp   :  Create New User,
//    route  :  POST / api/auth/register
//    access :  Public
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existedUser = await User.findOne({ email: email });

    if (!existedUser) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });

      const userCreated = await user.save();

      if (!userCreated) {
        errorFunc(400, "invalid User input");
      }
       
       generateToken(res , userCreated._id , userCreated.email)

      res.status(200).json({
        message: "New User is registered !",
        user: userCreated,
      });
    }
    // throwing error if user already exists
    errorFunc(400, "User Already Exists");
  } catch (error) {
    catchError(error, next)
  }
};

//    desp   :  login the user/ Clear Cookie,
//    route  :  POST / api/auth/logout
//    access :  Private
exports.logoutUser = async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expiresIn: new Date(0),
  });

  res.status(200).json({
    message: "Logged Out!",
  });
};
