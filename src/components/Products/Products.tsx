import React from "react";

import { ProductsData } from "../../models/data.model";

interface Props {
  data: ProductsData[] | null;
  error: string | null;
  status: string | null;
}

const Products: React.FC<Props> = (props) => {
  const { status, error, data: loadedProducts } = props;

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "completed" && !!error) {
    return <p>{error}</p>;
  }

  if (!loadedProducts || loadedProducts.length === 0) {
    return <p>List empty</p>;
  }

  return (
    <div>
      {loadedProducts.map((loadedProduct) => (
        <p key={loadedProduct.id}>{loadedProduct.title}</p>
      ))}
    </div>
  );
};

export default Products;
