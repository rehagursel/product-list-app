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
          display={{ lg: "flex" }}
          justifyContent="space-between"
          sx={{ width: "100%", my: {xs: 10, sm:12} }}
        >
          <Box width={{ lg: "20%" }}>
            <Categories />
          </Box>
          <Box width={{ lg: "78%" }}>
            <SearchBar />
            <Box>{props.children}</Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Layout;
