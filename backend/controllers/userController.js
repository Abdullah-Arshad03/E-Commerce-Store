

// desp   :  get User Profile
// router :  GET / api/users/profile
// access :  Private
exports.getUserProfile = async(req, res , next) =>{
res.send('getuserProfile')

}

// desp   :  get User Profile
// router :  PUT / api/users/profile
// access :  Private
exports.updateUserProfile = async(req, res , next) =>{
    res.send('updateUserProfile')


}

// desp   :  get User Profile
// router :  GET / api/users
// access :  Private / admin
exports.getUsers = async(req, res , next) =>{
    res.send('get User')


}


// desp   :  get User Profile
// router :  GET / api/users/:id
// access :  Private
exports.getUserById = async(req, res , next) =>{
    res.send('get User by id')


}

// desp   :  get User Profile
// router :  GET / api/users/:id
// access :  Private / Admin
exports.deleteUser = async(req, res , next) =>{
res.send('delete user')



}

// desp   :  get User Profile
// router :  PUT / api/users/:id
// access :  Private
exports.updateUser = async (req, res , next) =>{

    res.send('update User')

}