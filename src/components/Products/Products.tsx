import React from "react";
import { useSelector } from "react-redux";

import { ProductsData } from "../../models/data.models";
import { RootState } from "../../store";
import { Box, Grid, Typography, Skeleton } from "@mui/material";
import ProductsItem from "./ProductsItem";
import { v4 as uuid } from "uuid";

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
      <Grid container spacing={{ xs: 2, md: 3 }} textAlign="center">
        {skeletonAmount.map(() => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            xl={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            key={uuid()}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                width: { ...{ xs: 250, sm: 280 } },
                height: { ...{ xs: 350, sm: 400 } },
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
                  animation="wave"
                  sx={{ width: { ...{ xs: 150, md: 200 } } }}
                  height={200}
                />
                <Skeleton width="100%" animation="wave" />
                <Skeleton width="100%" animation="wave" />
                <Skeleton width="100%" animation="wave" />
                <Skeleton width="100%" animation="wave" />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
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
