import { Box, AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Mainheader = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyStore
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="cart"
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={1} color="error">
            <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Mainheader;
