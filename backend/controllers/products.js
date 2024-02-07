const products = require("../data/products");

exports.getProducts = (req, res, next) => {
  res.json({ message: "all products are fetched", products: products });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.id;
  console.log(prodId)

  const product = products.find((p) => {
    return p._id === prodId;
  });
  res.json({
    message: "here is the single product",
    product: product,
  });
};
