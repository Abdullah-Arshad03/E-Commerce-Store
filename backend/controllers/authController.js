const User = require('../models/userModel')
const bcrypt = require ('bcryptjs')


// Error Helper Function 

const errorFunc = ( statusCode , errorMessage ) =>{
    const error  = new Error(errorMessage)
    error.statusCode = statusCode // unauthorized status
    throw error
}

//    desp   :  login the user / get Token,
//    route  :  POST / api/auth/login
//    access :  Public
exports.loginUser = async(req, res , next) =>{

    const {email , password } = req.body


    try {
        const user = await User.findOne({email : email})

        if (!user){
           errorFunc(401 , 'Invalid Email or Password!')
        }
        
        const passEqual = await bcrypt.compare(password , user.password) 
        

        if(!passEqual){
            errorFunc(401 , 'Invalid Email or Password!')
        }

        res.status(200).json({
            _id : user._id,
            email : user.email,
            password : user.password,
            isAdmin : user.isAdmin
        })
        
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500
        }
        next(error)
    }
}

//    desp   :  Create New User,
//    route  :  POST / api/auth/register
//    access :  Public
exports.registerUser = async (req, res , next) =>{
    res.send('in the registerUser route')
}


//    desp   :  login the user/ Clear Cookie,
//    route  :  POST / api/auth/logout
//    access :  Private
exports.logoutUser = async (req, res , next) =>{
    res.send('in the LogoutUser route')

}