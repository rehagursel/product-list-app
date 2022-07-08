import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Products from "./components/Products/Products";
import Layout from "./components/Layout/Layout";
import useHttp from "./hooks/use-http";
import { listActions } from "./store/list-slice";
import { getAllProducts } from "./lib/api";

const App: React.FC = () => {
  const {
    sendRequest,
    status,
    data: loadedProducts,
    error,
  } = useHttp(getAllProducts, true);
  const dispatch = useDispatch();

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    if (loadedProducts) {
      dispatch(listActions.loadItems(loadedProducts));
    }
  }, [loadedProducts, dispatch]);

  return (
    <Layout>
      <Products status={status} error={error} />
    </Layout>
  );
};

export default App;
