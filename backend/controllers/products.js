
const products = require('../data/products')

exports.getProducts = (req, res , next)=>{
    res.json({message : 'all products are fetched',
products : products})

}