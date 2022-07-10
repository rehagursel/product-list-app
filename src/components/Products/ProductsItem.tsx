import { useState } from "react";
import { useDispatch } from "react-redux";

import { cartActions } from "../../store/cart-slice";
import { Box, Avatar, Typography, Button, Grid } from "@mui/material";

interface Props {
  image: string;
  title: string;
  price: number;
  id: number;
}

const ProductsItem = (props: Props) => {
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
      lg={4}
      xl={3}
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
          width: { ...{ xs: 250, sm: 265, md: 280 } },
          height: { ...{ xs: 350, sm: 400 } },
          pt: 2,
          pb: 1,
          px: 2,
          borderRadius: "20px",
          border: ".5px solid",
          borderColor: "primary.main",
        }}
        onMouseEnter={addButtonShowHandler}
        onMouseLeave={addButtonShowHandler}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: { ...{ xs: "88%", sm: "85%", md: "90%" } } }}
        >
          <Avatar
            src={image}
            variant="square"
            sx={{
              width: { ...{ xs: 150, sm: 120, md: 180, lg: 200 } },
              height: { ...{ xs: 150, sm: 120, md: 180, lg: 200 } },
            }}
          />
          <Typography
            mt={2}
            textAlign="center"
            border="none"
            sx={{
              overflow: "auto",
            }}
          >
            {title}
          </Typography>
          <Typography mt={1}>${price}</Typography>
        </Box>
        {addButtonOpen && (
          <Button variant="outlined" onClick={addToCartHandler}>
            Add to Cart
          </Button>
        )}
      </Box>
    </Grid>
  );
};

export default ProductsItem;
