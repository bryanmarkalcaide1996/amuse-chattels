import React, { useEffect, useContext, useReducer, createContext } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

const getLocalStorage = () => {
  let cartData = JSON.parse(localStorage.getItem("cart"));
  if (cartData) {
    return cartData;
  } else {
    return [];
  }
};

const initialState = {
  cart: getLocalStorage(),
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 534,
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Add to Cart Function
  function addToCart(id, mainColor, amount, singleProduct) {
    dispatch({
      type: ADD_TO_CART,
      payload: { id, mainColor, amount, singleProduct },
    });
  }

  // Remove Item Function
  function removeItem(id) {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  }

  // Toggle Amount Function
  function toggleAmount(id, value) {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  }

  // Clear Cart Function
  function clearCart() {
    dispatch({ type: CLEAR_CART });
  }

  // Persist Data to Local Storage

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem("cart", JSON.stringify([...state.cart]));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
