import React, { useEffect } from "react";

import Products from "./components/Products/Products";
import Layout from "./components/Layout/Layout";
import useHttp from "./hooks/use-http";
import { getAllProducts } from "./lib/api";

const App: React.FC = () => {
  const {
    sendRequest,
    status,
    data: loadedProducts,
    error,
  } = useHttp(getAllProducts, true);

  useEffect(() => {
    console.log("useEffect1");
    sendRequest();
  }, [sendRequest]);

  return (
    <Layout>
      <Products status={status} data={loadedProducts} error={error} />
    </Layout>
  );
};

export default App;
