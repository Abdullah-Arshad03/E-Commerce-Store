

// desp   :  get User Profile
// router :  GET / api/users/profile
// access :  Private
exports.getUserProfile = (req, res , next) =>{
res.send('getuserProfile')

}

// desp   :  get User Profile
// router :  PUT / api/users/profile
// access :  Private
exports.updateUserProfile = (req, res , next) =>{
    res.send('updateUserProfile')


}

// desp   :  get User Profile
// router :  GET / api/users
// access :  Private / admin
exports.getUsers = (req, res , next) =>{
    res.send('get User')


}


// desp   :  get User Profile
// router :  GET / api/users/:id
// access :  Private
exports.getUserById = (req, res , next) =>{
    res.send('get User by id')


}

// desp   :  get User Profile
// router :  GET / api/users/:id
// access :  Private / Admin
exports.deleteUser = (req, res , next) =>{
res.send('delete user')



}

// desp   :  get User Profile
// router :  PUT / api/users/:id
// access :  Private
exports.updateUser = (req, res , next) =>{

    res.send('update User')

}