import React from "react";
import { useDispatch } from "react-redux";

import { CartItemData } from "../../models/data.models";
import { cartActions } from "../../store/cart-slice";
import {
  Avatar,
  Box,
  ButtonGroup,
  Button,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface Props {
  item: CartItemData;
}

const CartItem = (props: Props) => {
  const { id, image, title, amount, price } = props.item;

  const dispatch = useDispatch();

  const deleteFromCartHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const addToCartHandler = () => {
    const addCartItem = {
      id,
      title,
      image,
      amount,
      price,
    };
    dispatch(cartActions.addItemToCart(addCartItem));
  };

  const deleteItemFromCartHandler = () => {
    dispatch(cartActions.deleteItemTotalyFromCart(id));
  };

  return (
    <React.Fragment>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open cart drawer"
        sx={{ float: "right" }}
        onClick={deleteItemFromCartHandler}
      >
        <DeleteForeverIcon />
      </IconButton>
      <Box
        display="flex"
        sx={{ m: 5 }}
        alignItems="center"
        justifyContent={"space-between"}
        gap={2}
      >
        <Avatar variant="square" src={image} sx={{ width: 60, height: 60 }} />
        <Typography>{title}</Typography>
        <Box textAlign="center">
          <Typography>${price}</Typography>
          <Typography variant="h6">x{amount}</Typography>
          <ButtonGroup variant="outlined">
            <Button onClick={deleteFromCartHandler}>-</Button>
            <Button onClick={addToCartHandler}>+</Button>
          </ButtonGroup>
        </Box>
      </Box>
      <Divider />
    </React.Fragment>
  );
};

export default CartItem;
