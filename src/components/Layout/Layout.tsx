import React from "react";

import MainHeader from "./MainHeader";
import SearchBar from "..//Products/SearchBar";
import Categories from "../Products/Categories";
import { Container, CssBaseline, Box } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <Container sx={{ width: "100%" }} maxWidth="xl">
      <CssBaseline />
      <MainHeader />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ flexGrow: 1 }}
      >
        <Box
          display={{ sm: "flex" }}
          justifyContent="space-between"
          sx={{ width: "100%", my: 15 }}
        >
          <Box width={{ sm: "35%", md: "25%", lg: "19%" }}>
            <Categories />
          </Box>
          <Box width={{ lg: "78%", md: "73%", sm: "59%" }}>
            <SearchBar />
            <Box>{props.children}</Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Layout;
