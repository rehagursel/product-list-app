import { CartData } from "../../models/data.model";
import { Box, Typography } from "@mui/material";
import CartItem from "./CartItem";

interface Props {
  cartData: CartData;
}

const CartItems: React.FC<Props> = (props) => {
  const cartItems = props.cartData.cartItems;
  const totalPrice = props.cartData.totalPrice;
  const isCartEmpty = cartItems.length === 0;

  return (
    <Box>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={{
            id: item.id,
            title: item.title,
            image: item.image,
            amount: item.amount,
            price: item.price,
          }}
        />
      ))}
      {!isCartEmpty && (
        <Typography variant="h6">
          Total Price: {totalPrice.toFixed(2)}
        </Typography>
      )}
    </Box>
  );
};

export default CartItems;
