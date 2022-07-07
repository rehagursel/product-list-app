import React from "react";

import { ProductsData } from "../../models/data.model";
import { Box, Grid, Typography, /* Container, CssBaseline */ } from "@mui/material";
import ProductsItem from "./ProductsItem";

interface Props {
  data: ProductsData[] | null;
  error: string | null;
  status: string | null;
}

const Products: React.FC<Props> = (props) => {
  const { status, error, data: loadedProducts } = props;

  if (status === "pending") {
    return (
      <Box sx={{ mt: 10 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (status === "completed" && !!error) {
    return (
      <Box sx={{ mt: 10 }}>
        <Typography>{error}</Typography>
      </Box>
    );
  }

  if (!loadedProducts || loadedProducts.length === 0) {
    return (
      <Box sx={{ mt: 10 }}>
        <Typography>There are no product</Typography>
      </Box>
    );
  }

  return (
    /*  <Box display="flex" flexWrap="wrap" justifyContent="center" sx={{ mt:10 }}>
      {loadedProducts.map((product) => (
        <ProductsItem
          key={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
        />
      ))}
    </Box> */
    <Box /* border="1px solid green" */ sx={{ my: 15}}>
       
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        /* border="1px solid yellow" */
      >
        {loadedProducts.map((product) => (
          <ProductsItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
      </Grid>
    </Box>
  );
};
export default Products;
