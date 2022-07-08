import { CartData } from "../../models/data.models";
import { Box, Typography, Divider, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CartItem from "./CartItem";

interface Props {
  cartData: CartData;
  onClose: () => void;
}

const CartItems: React.FC<Props> = (props) => {
  const cartItems = props.cartData.cartItems;
  const totalPrice = props.cartData.totalPrice;
  const isCartEmpty = cartItems.length === 0;

  return (
    <Box>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="close cart drawer"
        sx={{ float: "right", m: 1 }}
        onClick={() => props.onClose()}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h4" sx={{ mx: 3, mt: 5 }}>
        ShoppingCart
      </Typography>
      <Divider sx={{ mt: 2 }} />
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
        <Typography variant="h6" sx={{ float: "right", m: 2 }}>
          Total Price: {totalPrice.toFixed(2)}
        </Typography>
      )}
    </Box>
  );
};

export default CartItems;
