import Cart from "../Cart/Cart";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";

const Mainheader: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyStoreApp
          </Typography>
          <Cart />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Mainheader;
