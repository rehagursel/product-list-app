import React from "react";
import { useDispatch } from "react-redux";

import { CartItemData } from "../../models/data.model";
import { cartActions } from "../../store/cart-slice";
import { Avatar, Box, ButtonGroup, Button, Typography } from "@mui/material";

const CartItem: React.FC<{ item: CartItemData }> = (props) => {
  const { id, image, title, amount, price } = props.item;

  const dispatch = useDispatch();

const deleteFromCartHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
}
const addToCartHandler = () => {
    const addCartItem = {
        id,
        title,
        image,
        amount,
        price,
      };
    dispatch(cartActions.addItemToCart(addCartItem));
}

  return (
    <React.Fragment>
      <Box
        display="flex"
        sx={{ pt: 2, pb: 2 }}
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
            <Button onClick={addToCartHandler}>+</Button>
            <Button onClick={deleteFromCartHandler}>-</Button>
          </ButtonGroup>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default CartItem;