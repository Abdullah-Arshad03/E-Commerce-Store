const mongoose = require('mongoose')

const mongoConnect = async () =>{

 try {
   const con = await mongoose.connect(process.env.MONGO_URI)
   console.log('Configured, mongoose connected !' )
 } catch (error) {
  console.log('Configured, mongoose aint connected!', error.message)
  process.exit(1)
 }
}

module.exports = mongoConnect