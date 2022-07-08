import React from "react";
import { useSelector } from "react-redux";

import { ProductsData } from "../../models/data.models";
import { RootState } from "../../store";
import { Box, Grid, Typography, Skeleton, Stack } from "@mui/material";
import ProductsItem from "./ProductsItem";

interface Props {
  error: string | null;
  status: string | null;
}

const skeletonAmount = Array(20).fill("");

const Products: React.FC<Props> = (props) => {
  const { status, error } = props;
  const renderList: ProductsData[] = useSelector(
    (state: RootState) => state.list.sortedList
  );

  if (status === "pending") {
    return (
      <Grid container textAlign="center">
        {skeletonAmount.map((item, index) => (
          <Grid
            item
            sm={12}
            md={6}
            lg={4}
            xl={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ p: 3, ml: { ...{ xs: 10, md: 0 } } }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                width: { ...{ xs: 250, sm: 240, md: 250, lg: 280 } },
                height: { ...{ md: 400 } },
                pt: 2,
                pb: 1,
                px: 2,
                borderRadius: "20px",
                border: ".5px solid",
                borderColor: "primary.main",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="space-between"
                height="100%"
              >
                <Skeleton
                  variant="rectangular"
                  sx={{ width: { ...{ xs: 150, md: 200 } } }}
                  height={200}
                />
                <Skeleton width="100%" animation="wave" />
                <Skeleton width="100%" animation="wave" />
                <Skeleton width="100%" animation="wave" />
                <Skeleton width="100%" />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (status === "completed" && !!error) {
    return (
      <Box display="flex" sx={{ mt: 15 }}>
        <Typography>{error}</Typography>
      </Box>
    );
  }

  if (!renderList || renderList.length === 0) {
    return (
      <Box display="flex" sx={{ mt: 15 }}>
        <Typography sx={{ m: "50px auto" }}>There are no product</Typography>
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
