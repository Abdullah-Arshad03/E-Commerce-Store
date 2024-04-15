const path = require('path') // built in modules
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const envPath = path.join(__dirname, '../.env'); // Adjust the path as needed

// Load the environment variables from the .env file
dotenv.config({ path: envPath });
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const prodRoutes = require("./routes/productsRoutes");
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes  = require('./routes/uploadRoutes')


// body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// cookie parser middleware
app.use(cookieParser())

// handling the cors errors
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000']; 
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH , DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use("/api/products", prodRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users' , userRoutes);
app.use('/api/orders', orderRoutes )
app.use('/api/upload' , uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
   res.send({clientId : process.env.PAYPAL_CLIENT_ID})
)

// const __dirname = path.resolve() // set __dirname to current directory

app.use('/images' , express.static(path.join(__dirname , 'images')))


if (process.env.NODE_ENV === 'production'){

  // set static folder
  app.use(express.static(path.join(__dirname, '..' , '/frontend/build')));

  // Other routes and middleware can be defined here
  
  // This route serves the index.html file for any other route
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '..',  'frontend' , 'build' , 'index.html'));
  });

}else{
  app.listen(port, ()=>console.log('server running!'))
}


// error handling middleware 

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
  // await mongoose.connect('mongodb://127.0.0.1:27017/e-commerce-store')
    console.log("Mongoose! connected ");
  } catch (err) {
    console.log("Mongoose aint connected!");
  }
};

connection();


app.listen(port, ()=>console.log('server running!'))