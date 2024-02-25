const User = require('../models/userModel')

//    desp   :  login the user / get Token,
//    route  :  POST / api/auth/login
//    access :  Public
exports.loginUser = async(req, res , next) =>{

    const {email , password } = req.body


    try {
        const user = await User.findOne({email : email})
        const Pass = await user.matchPassword(password)
        console.log(Pass)

        if (!user){
            const error  = new Error('Invalid Email or Password')
            error.statusCode = 401 // unauthorized status
            throw error
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