const bcrypt = require('bcryptjs')

const  users = [{
    name : 'Abdullah Bin Arshad',
    email : 'abdullah@gmail.com',
    password : bcrypt.hashSync('abdullah', 10),
    isAdmin : true
   
},{
    name : 'Umer',
    email : 'umer@gmail.com',
    password : 'abdullah',
    isAdmin : false

},{
    name : 'amna',
    email : 'amna@gmail.com',
    password : 'abdullah',
    isAdmin : false

}]

module.exports = users