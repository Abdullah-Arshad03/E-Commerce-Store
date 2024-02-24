

//    desp   :  login the user / get Token,
//    route  :  POST / api/auth/login
//    access :  Public
exports.loginUser = (req, res , next) =>{
    res.send('in the loginUser route')

}



//    desp   :  Create New User,
//    route  :  POST / api/auth/register
//    access :  Public
exports.registerUser = (req, res , next) =>{
    res.send('in the registerUser route')
}


//    desp   :  login the user/ Clear Cookie,
//    route  :  POST / api/auth/logout
//    access :  Private
exports.logoutUser = (req, res , next) =>{
    res.send('in the LogoutUser route')

}