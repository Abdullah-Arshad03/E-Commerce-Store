import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Button } from "@mui/material";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast , Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useUpdateProductMutation , useUploadProductMutation} from "../../slices/productApiSlice";
import { useGetProductDetailsQuery } from "../../slices/productApiSlice";

const UpdateProductScreen = () => {
  const { id: prodId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const [updateProd, { isLoading: updateLoading }] = useUpdateProductMutation();
  const navigate = useNavigate();
   const [uploadProd , {isLoading : uploadLoading}] = useUploadProductMutation()
  const {
    data: Product,
    isLoading: productLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(prodId);

  useEffect(() => {
    if (Product && Product.product) {
      setName(Product.product.name);
      setPrice(Product.product.price);
      setImage(Product.product.image);
      setBrand(Product.product.brand);
      setCategory(Product.product.category);
      setCountInStock(Product.product.countInStock);
      setDescription(Product.product.description);
    }
  }, [Product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProd({
        prodId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      }).unwrap();
      toast.success("Product is updated!");
      refetch();
      console.log(res);
      navigate("/admin/productlist");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const uploadImageHandler = async(e) =>{
    console.log(e.target.files[0])
    const formData = new FormData()
    formData.append('image' , e.target.files[0])

    try {
    const res = await uploadProd(formData).unwrap()
    console.log('this is the response after successfull upload of the image', res)
    setImage(res.image)
    toast.success(res.message)

    
    } catch (error) {
      toast.error(error.data.message)
    }

  }

  return (
    <>
    <Toaster></Toaster>
      <Link to="/admin/productlist">
        <Button className="buttonn" variant="outlined">
          Go Back
        </Button>
      </Link>

      <FormContainer>
        <h2>Update Product</h2>

        {updateLoading && <Loader />}

        {productLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="name" className="my-3">
              <FormLabel className="fw-semibold">Name</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="price" className="my-3">
              <FormLabel className="fw-semibold">Price</FormLabel>
              <FormControl
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="image" className="my-3">
              <FormLabel className="fw-semibold">Image</FormLabel>
              <FormControl
                type=""
                placeholder="Add image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></FormControl>
              <FormControl 
              type="file"
              label="Choose a File"
              onChange={uploadImageHandler}
              >
              </FormControl>
            </FormGroup>

            <FormGroup controlId="brand" className="my-3">
              <FormLabel className="fw-semibold">Brand</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="category" className="my-3">
              <FormLabel className="fw-semibold">Category</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="countInStock" className="my-3">
              <FormLabel className="fw-semibold">countInStock</FormLabel>
              <FormControl
                type="number"
                placeholder="Enter Count in Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="description" className="my-3">
              <FormLabel className="fw-semibold">Description</FormLabel>
              <FormControl
                as="textarea"
                placeholder="Enter Description of the Product"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></FormControl>
            </FormGroup>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                className="buttonn"
                // variant="outlined"
                type="submit"
                disabled={updateLoading}
                style={{
                  marginTop: "10px",
                  color: "black",
                  border: "1px solid black",
                  padding: "5px 20px",
                }}
              >
                Update Product
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UpdateProductScreen;
