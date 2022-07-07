import React, { useState } from "react";
import { useSelector } from "react-redux";

import CartItems from "./CartItems"
import { Drawer, IconButton, Badge } from "@mui/material";
import { CartData } from "../../models/data.model";
import { RootState } from "../../store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Cart: React.FC<{}> = () => {
  const [open, setOpen] = useState(false);
 
  /* const totalCartAmount: number = useSelector((state: RootState) => state.cart.totalAmount); */
  const cartData: CartData = useSelector((state: RootState) => state.cart);
  const totalCartAmount = cartData.totalAmount
  

  return (
    <React.Fragment>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open cart drawer"
        onClick={() => setOpen(true)}
       /*  sx={{ ...(open && { display: "none" }) }} */
      >
        <Badge badgeContent={totalCartAmount} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        PaperProps={{
          sx: {
            width: "30%",
            minWidth: 300,
          },
        }}
        onClose={() => setOpen(false)}
      >
        <CartItems cartData={cartData} />
      </Drawer>
    </React.Fragment>
  );
};

export default Cart;
