import { Box, Grid, Skeleton } from "@mui/material";
import { v4 as uuid } from "uuid";

const SkeletonLayout = () => {
  const skeletonAmount = Array(20).fill("");

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
};

export default SkeletonLayout;
