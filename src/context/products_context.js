import axios from "axios";
import React, { useContext, useEffect, useReducer, createContext } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const initialState = {
  toggleSidebar: false,
  prodLoadingState: false,
  prodErrorState: false,
  products: [],
  featuredProducts: [],
  singleProdLoadingState: false,
  singleProdErrorState: false,
  singleProduct: {},
};

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function openSidebar() {
    dispatch({ type: SIDEBAR_OPEN });
  }
  function closeSidebar() {
    dispatch({ type: SIDEBAR_CLOSE });
  }

  // Fetches all products
  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const resp = await axios.get(url);
      const prod = resp.data;
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: prod });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  // Fetches single products
  const fetchSingleProd = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const resp = await axios.get(url);
      const singleProd = resp.data;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProd });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  useEffect(() => {
    fetchProducts(url);
  }, []);
  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProd }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
const useProductsContext = () => {
  return useContext(ProductsContext);
};

export { useProductsContext, ProductsProvider };
