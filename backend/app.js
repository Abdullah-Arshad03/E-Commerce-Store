const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const prodRoutes = require("./routes/products");

// handling the cors errors

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use("/api/products", prodRoutes);


app.use((error,req,res,next)=>{
  console.log("this is the error from the error middleware : ", error)

  const status = error.statusCode || 500
  const errorMessage = error.message
  const stack = error.stack
  res.status(status).json({
    message : errorMessage,
    statusCode : status,
    stack : process.env.NODE_ENV === 'production' ? 'production' : stack
  })
})

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongoose! connected");
  } catch (err) {
    console.log("Mongoose aint connected!");
  }
};

connection();

app.listen(port, ()=>console.log('server running!'))