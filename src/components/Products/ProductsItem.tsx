import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { cartActions } from "../../store/cart-slice";
/* import { ProductsData } from "../../models/data.model"; */
import { Box, Avatar, Typography, Button, /* Card, */ Grid } from "@mui/material";

interface Props {
  image: string;
  title: string;
  price: number;
  id: number;
}

const ProductsItem: React.FC<Props> = (props) => {
  const { image, title, price, id } = props;
  const [addButtonOpen, setAddButtonOpen] = useState<Boolean>(false);

  const dispatch = useDispatch();

  const addButtonShowHandler = () => {
    setAddButtonOpen((prevState) => !prevState);
  };

  const addToCartHandler = () => {
    const newCartItem = {
      id,
      title,
      image,
      amount: 1,
      price,
    };

    dispatch(cartActions.addItemToCart(newCartItem));
  };

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      /* border="1px solid black" */
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: { ...{ xs: 280, sm: 250, md: 250, lg: 280 } },
          height: 400,
          pt: 3,
          pb: 1,
          px: 3,
          borderRadius: "20px",
          border: ".5px solid",
          borderColor: "primary.main",
        }}
        onMouseEnter={addButtonShowHandler}
        onMouseLeave={addButtonShowHandler}
      >
        <Avatar
          src={image}
          variant="square"
          sx={{
            width: { ...{ xs: 150, md: 180, lg: 200 } },
            height: { ...{ xs: 150, md: 180, lg: 200 } },
          }}
        />
        <Typography
          mt={3}
          textAlign="center"
          border="none"
          sx={{
            /*   display: '-webkit-box', */
            overflow: "auto",
            /*        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 3, */
          }}
        >
          {" "}
          {title}
        </Typography>
        <Typography mt={1}>${price}</Typography>
        {addButtonOpen && (
          <Button variant="outlined" onClick={addToCartHandler}>
            ADD TO CART
          </Button>
        )}
      </Box>
    </Grid>
  );
};

export default ProductsItem;
