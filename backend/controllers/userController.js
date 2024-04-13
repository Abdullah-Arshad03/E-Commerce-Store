const User = require('../models/userModel')
const errorFunc = require('../utils/errorFunc')
const catchError = require('../utils/catchError')
const { findById } = require('../models/productModel')


// desp   :  get User Profile
// router :  GET / api/users/profile
// access :  Private
exports.getUserProfile = async(req, res , next) =>{

    try {
        console.log('this is the logged in user: ',req.user)
        const user = await User.findById(req.user._id)

        if(!user){
            errorFunc(404 , 'User not found!')
        }

        res.status(200).json({
            _id : user._id,
            name : user.name, 
            email : user.email,
            isAdmin : user.isAdmin
        })
 
        
        
    } catch (error) {
       catchError(error,next)
    }


}

// desp   :  get User Profile
// router :  PUT / api/users/profile
// access :  Private
exports.updateUserProfile = async(req, res , next) =>{

  try {

    const user = await User.findById(req.user._id)

    if(!user){
        errorFunc(404 , 'User not found!')
    }

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    
    if(req.body.password){
        user.password = req.body.password
    }
    
   const updatedUser =  await user.save()

   res.status(200).json({
    message : 'User profile is updated!',
    _id : updatedUser._id,
    name : updatedUser.name,
    email : updatedUser.email,
    password : updatedUser.password
   })

  } catch (error) {
   catchError(error,next)
  }


}

// desp   :  get User Profile
// router :  GET / api/users
// access :  Private / admin
exports.getUsers = async(req, res , next) =>{
  try {
     const users = await User.find()

     res.status(200).json({
        message : 'fetched all the users',
        users : users
     })
  } catch (error) {
    catchError(error, next)
  }

}


// desp   :  get User Profile
// router :  GET / api/users/:id
// access :  Private
exports.getUserById = async(req, res , next) =>{
    try {
        const userId = req.params.id

        const user = User.findOne({_id : userId})
        console.log('this is the user found by the id : ', user)

        if(!user){
            errorFunc(404 , 'User not found')
        }
        
       res.status(200).json({
        message : 'user found by the id : ' , 

       })
    } catch (error) {
      catchError(error, next)
    }


}

// desp   :  get User Profile
// router :  GET / api/users/:id
// access :  Private / Admin
exports.deleteUser = async(req, res , next) =>{
try {

     const userId = req.params.id
     const user = User.findById(userId)

     if(!user){
        errorFunc(404 ,'user not found')
     }
     if(user.isAdmin){
        errorFunc(400 ,  'Cannot Delete Admin User!') // status 400 is the client error
     }
    const deleted = await User.deleteOne({_id : user._id})

    console.log('user is deleted: ', deleted)

} catch (error) {
    catchError(error, next)
}



}

// desp   :  get User Profile
// router :  PUT / api/users/:id
// access :  Private
exports.updateUser = async (req, res , next) =>{

    try {

        const user = await findById(req.params.id)

        if(!user){
            errorFunc(404 , 'User not Found!')
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email ;
        user.isAdmin = Boolean(req.body.isAdmin)

       const userUpdated =  await user.save()
       console.log('User is updated !' , userUpdated)

       res.status(200).json({
        message : 'user is updated!',
        updatedUser : userUpdated
       })
        
    } catch (error) {
        catchError(error , next)

    }

}