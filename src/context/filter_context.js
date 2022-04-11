import React, { useEffect, useContext, createContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filteredProducts: [],
  allProducts: [],
  gridView: false,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    freeShippingStat: false,
  },
};

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products } = useProductsContext();

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  function toggleGridView() {
    dispatch({ type: SET_GRIDVIEW });
  }
  function toggleListView() {
    dispatch({ type: SET_LISTVIEW });
  }
  const updateSort = ({ target: { value } }) => {
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  function updateFilters({
    target: {
      name,
      value,
      textContent,
      checked,
      dataset: { clr },
    },
  }) {
    switch (name) {
      case "category":
        dispatch({
          type: UPDATE_FILTERS,
          payload: { name, value: textContent },
        });
        break;
      case "color":
        dispatch({
          type: UPDATE_FILTERS,
          payload: { name, value: clr },
        });
        break;
      case "price":
        dispatch({
          type: UPDATE_FILTERS,
          payload: { name, value: Number(value) },
        });
        break;
      case "freeShippingStat":
        dispatch({
          type: UPDATE_FILTERS,
          payload: { name, value: checked },
        });
        break;

      default:
        dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
        break;
    }
  }
  function clearFilters() {
    dispatch({ type: CLEAR_FILTERS });
  }

  return (
    <FilterContext.Provider
      value={{
        ...state,
        toggleGridView,
        toggleListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
