const express = require('express')

const app = express()
const prodRoutes = require('./routes/products')


app.use('/api',prodRoutes)



app.listen(5000, ()=>{
    console.log("Server is running on the port 5000!")
})