import React from "react";

import MainHeader from "./MainHeader";
import { Container, CssBaseline } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <MainHeader />
      <main>{props.children}</main>
    </Container>
  );
};

export default Layout;
