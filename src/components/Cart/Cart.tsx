import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CartItems from "./CartItems";
import { Drawer, IconButton, Badge } from "@mui/material";
import { CartData } from "../../models/data.models";
import { RootState } from "../../store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Cart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const cartData: CartData = useSelector((state: RootState) => state.cart);
  const totalCartAmount = cartData.totalAmount;

  useEffect(() => {
    if (totalCartAmount === 0) {
      setIsOpen(false);
    }
  }, [totalCartAmount]);

  const closeCartHandler = () => {
    setIsOpen(false);
  };

  const openCartHandler = () => {
    setIsOpen(true);
  };

  return (
    <React.Fragment>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open cart drawer"
        onClick={openCartHandler}
      >
        <Badge badgeContent={totalCartAmount} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Drawer
        anchor="right"
        open={isOpen}
        PaperProps={{
          sx: {
            width: "30%",
            minWidth: 300,
          },
        }}
        onClose={closeCartHandler}
      >
        <CartItems cartData={cartData} onClose={closeCartHandler} />
      </Drawer>
    </React.Fragment>
  );
};

export default Cart;
