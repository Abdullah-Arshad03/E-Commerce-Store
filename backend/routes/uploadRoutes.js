const multer = require('multer')
const express = require('express')
const router = express.Router()
const path = require ('path')


const diskStorage = multer.diskStorage({
    destination : (req, file , cb) =>{
        cb(null , 'uploads/')
    } ,
    filename  : (req, file , cb) =>{
        cb(null , `${file.originalname} + ${Date.now()}` )
    }
})

const checkFileType = (req , file , cb) =>{
    const filetypes = /jpg | jpeg  | png /;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    console.log('this is the ')

    const mimetype = filetypes.test(file.mimetype);
    console.log('this the mimetype of the file ' , mimetype)
    if(extname && mimetype) {
        return cb(null , true);
    }else {
        cb('Images Only!') 
        // the first argument in the cb is the error and if there is no mimetype and extname, we return a call back with Images only.
    }
} 

const upload = multer ({storage : diskStorage })

router.post('/' , upload.single('image') , (req, res)=>{
    res.send({
        message : 'image Uploaded',
        image : `${req.file.path}`
}
    
    )
})


module.exports = router
