import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../contexts/products";
import { Box, Divider, Typography } from "@mui/material";
import Header from "../components/Header";
import getRatings from "../components/ProductRatings";
import RoundedButton from "../components/RoundedButton";
import { Card } from "@mui/joy";
import { LocalShipping, Replay, CurrencyRupee } from "@mui/icons-material";

function ProductInfoPage() {
  // const item = props.

  const { productId } = useParams();
  const [id, setProductId] = useState(productId);
  const [currentItem, setcurrentItem] = useState({});
  const { getItem } = useContext(ProductContext);
  const item = getItem(productId);
  const {
    noOfItemsInCart,
    setNoOfItemsInCart,
    cartList,
    setCartList,
    buyList,
    setBuyList,
  } = useContext(ProductContext);
  const [itemCount, setItemCount] = useState(0);
  const addProductToCart = () => {
    const productInfo = {
      id: productId,
      quantity: itemCount,
    };
  
    // Check if the product already exists in the cart
    const existingProduct = cartList.find((product) => product.id === productId);
  
    if (existingProduct) {
      // If the product exists, update its quantity
      updateCartProduct(productId, itemCount);
    } else {
      // If the product doesn't exist, add it to the cart
      setNoOfItemsInCart(noOfItemsInCart + 1);
      setCartList((cartList) => [...cartList, productInfo]);
    }
  };
  
  const buyCurrentProduct = () => {
    //add this product in buy list
    const productInfo = {
      id: productId,
      quantity: itemCount,
    };
    setBuyList((buyList) => [...buyList, productInfo]);
  };
  const handleInc = () => {
    setItemCount((itemCount) => itemCount + 1);
    updateCartProduct(productId, itemCount + 1); // Update the cart with the new quantity
  };
  
  const handleDec = () => {
    setItemCount((itemCount) => (itemCount > 0 ? itemCount - 1 : 0));
    if (itemCount > 0) {
      updateCartProduct(productId, itemCount - 1); // Update the cart with the new quantity
    }
  };
  


  useEffect(() => {
    if (itemCount === 1) {
      addProductToCart()
    }
  }, [itemCount]);


  const updateCartProduct = (productId, newQuantity) => {
    setCartList((cartList) => {
      return cartList.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: newQuantity, // Update the quantity
          };
        }
        return product;
      });
    });
  };
  

  return (
    <Box>
      <Header />
      <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "80vh",
          marginTop: "20px",
        }}
      >
        <Box flex={1} width={"100%"} sx={{ marginRight: "20px" }}>
          <Box
            sx={{
              background: "rgb(222, 225, 227)",
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
            height={"80%"}
          >
            <img
              src={item.images[0]}
              style={{ objectFit: "contain" }}
              height={"90%"}
            />
          </Box>
          <Box
            sx={{
              height: "30vh",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                background: "rgb(222, 225, 227)",
                height: "70%",
                flex: 1,
                marginRight: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img src={item.images[1]} height={"90%"} width={"90%"} />
            </Box>
            <Box
              sx={{
                background: "rgb(222, 225, 227)",
                height: "70%",
                flex: 1,
                marginRight: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img src={item.images[2]} height={"90%"} width={"90%"} />
            </Box>
            <Box
              sx={{
                background: "rgb(222, 225, 227)",
                height: "70%",
                flex: 1,
                marginRight: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img src={item.images[3]} height={"90%"} width={"90%"} />
            </Box>
            <Box
              sx={{
                background: "rgb(222, 225, 227)",
                height: "70%",
                flex: 1,
                marginRight: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img src={item.images[1]} height={"90%"} width={"90%"} />
            </Box>
          </Box>
        </Box>

        <Box
          flex={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginTop: "40px",
            margin: "50px",
            height: "100%",
          }}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{ marginBottom: "10px" }}
            >
              {item.name}
            </Typography>
            <Typography sx={{ marginBottom: "10px" }}>
              {item.longDescript}
            </Typography>
            {getRatings(item.ratings)}
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            sx={{
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            <CurrencyRupee sx={{ fontSize: "20px" }} />
            {item.price}
          </Box>
          <Box
            sx={{
              width: "140px",
              height: "40px",
              background: "rgb(222, 225, 227)",
              border: "1px solid grey",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <div
              onClick={(e) => handleDec(itemCount - 1)}
              style={{ cursor: "pointer" }}
            >
              <Typography sx={{ fontSize: "36px" }}>-</Typography>
            </div>
            {itemCount}
            <div onClick={(e) => handleInc()} style={{ cursor: "pointer" }}>
              {" "}
              <Typography sx={{ fontSize: "29px" }}>+</Typography>
            </div>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "start" }}>
            <RoundedButton
              name="Add to Cart"
              background="white"
              color="rgb(2, 48, 32)"
              size="medium"
              width="200px"
              fontSize="18px"
              onClick={() => addProductToCart()}
            />
            <Box sx={{ marginRight: "30px" }}></Box>
            <RoundedButton
              name="Buy Now"
              background="rgb(2, 48, 32)"
              color="white"
              size="medium"
              width="200px"
              fontSize="18px"
              onClick={() => buyCurrentProduct()}
            />
          </Box>

          <Box sx={{ marginRight: "200px" }}>
            <Card>
              <Box sx={{ display: "flex" }}>
                <LocalShipping color="rgb(2, 48, 32)" />
                <Typography sx={{ marginLeft: "6px", fontWeight: "600" }}>
                  Free Delivery
                </Typography>
              </Box>
              <Typography>
                Purchase your first product with free delivery
              </Typography>
            </Card>

            <Card sx={{ marginTop: "10px" }}>
              <Box sx={{ display: "flex" }}>
                <Replay color="rgb(2, 48, 32)" />
                <Typography sx={{ marginLeft: "6px", fontWeight: "600" }}>
                  Return Policy
                </Typography>
              </Box>
              <Typography>Return your product with 10days here</Typography>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductInfoPage;
