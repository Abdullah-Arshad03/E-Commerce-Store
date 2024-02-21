import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Rating from "./Rating";


const Product = ({ product }) => {
  return (
    <>
      <Card sx={{ maxWidth: 345  }} >
        <Link to={`/products/${product._id}`}>
          <CardMedia
            sx={{ height: 200 }}
            image={product.image}
            title="green iguana"
          />
        </Link>
        <CardContent>
          <Link to={`/products/${product._id}`} style={{textDecorationColor:'gray'}}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="text.secondary"
              className="product-title"
            >
              {product.name}
            </Typography>
          </Link>
          <Typography variant="h5" color="text.dark">
            ${product.price}
          </Typography>
          <Typography variant="div" >
           <Rating value={product.rating} text={product.numReviews}/>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Product;
