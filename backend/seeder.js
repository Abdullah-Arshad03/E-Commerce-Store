const mongoose = require('mongoose')
const products = require('./data/products')
const users = require('./data/users')
const connection = require('./config/db')
const colors = require('colors')
const Product = require('./models/productModel')
const Order = require('./models/orderModel')
const User = require('./models/userModel')
const dotenv = require('dotenv')
dotenv.config()
connection()

const importData = async() =>{
    try {

        await Product.deleteMany()
        await Order.deleteMany()
        await User.deleteMany()

       const insertedUsers =  await User.insertMany(users)


       const adminUser =  insertedUsers[0]._id

       const sampleProducts = products.map((product)=>{
        return {...product, user : adminUser}
      })

       const insertedProducts =   await Product.insertMany(sampleProducts)

       console.log('these are the inserted products : ',insertedProducts)
console.log('data inserted'.green.inverse)

       process.exit()
        
    } catch (error) {
        console.log('error : ', error.message .red.inverse)
        process.exit(1)   
    }
}


const deleteData = async() =>{

    try {
        console.log('deleting the data: ')
        await Product.deleteMany()
        await User.deleteMany()
        await Order.deleteMany()
        console.log('data destroyed'.red.inverse)
        process.exit()

    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}


if(process.argv[2] === '-d'){
  deleteData()
}
else{
  importData()
}
