import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filteredProducts, gridView } = useFilterContext();
  if (filteredProducts.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        No products matched your search ...
      </h5>
    );
  }
  if (!gridView) {
    return <ListView filteredProducts={filteredProducts} />;
  }
  return <GridView filteredProducts={filteredProducts}>Products List</GridView>;
};

export default ProductList;
