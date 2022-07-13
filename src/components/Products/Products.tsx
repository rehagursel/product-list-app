import React from "react";
import { useSelector } from "react-redux";

import { ProductsData } from "../../models/data.models";
import { RootState } from "../../store";
import SkeletonLayout from "../Ui/SkeletonLayout"
import { Box, Grid, Typography } from "@mui/material";
import ProductsItem from "./ProductsItem";

interface Props {
  error: string | null;
  status: string | null;
}

const Products: React.FC<Props> = (props) => {
  const { status, error } = props;
  const renderList: ProductsData[] = useSelector(
    (state: RootState) => state.list.sortedList
  );
  //render skeleton layout when pending
  if (status === "pending") {
    return <SkeletonLayout/>
  }

  if (status === "completed" && !!error) {
    return (
      <Box display="flex" justifyContent="center" sx={{ mt: 15 }}>
        <Typography>{error}</Typography>
      </Box>
    );
  }

  if (!renderList || renderList.length === 0) {
    return (
      <Box display="flex" justifyContent="center" sx={{ mt: 15 }}>
        <Typography>There are no product</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {renderList.map((product) => (
        <ProductsItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
        />
      ))}
    </Grid>
  );
};
export default Products;
