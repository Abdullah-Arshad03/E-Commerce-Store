const express = require('express')
const dotenv = require ('dotenv')
const mongoose = require('mongoose')
dotenv.config()
const app = express()
const port = process.env.PORT || 5000
const prodRoutes = require('./routes/products')

// handling the cors errors

app.use((req, res , next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,PATCH')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    next()

})

app.use('/api',prodRoutes)

try{

    

const connection = async () =>{ 
  const con = await  mongoose.connect(process.env.MONGO_URI)
  console.log('Mongoose! connected')
}


connection()
app.listen(port, ()=>{
    console.log(`Server is running on the port ${port}`)
})
}
catch(err){
    console.log('Mongoose aint connected!')
}
