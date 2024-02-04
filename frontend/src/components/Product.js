import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        
        <CardMedia
          sx={{ height: 160 }}
          image={product.image}
          title="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="text.secondary"
          >
            {product.name}
          </Typography>
          <Typography variant="h5" color="text.dark">
            ${product.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            style={{ borderColor: "gray" }}
            variant="outlined"
          >
     
            Buy Now
          </Button>
          <Button
            size="small"
            style={{ borderColor: "gray" }}
            variant="outlined"
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Product;
