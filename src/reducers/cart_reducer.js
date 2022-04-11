import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      const {
        id,
        mainColor,
        amount,
        singleProduct: { name, images, price, stock },
      } = payload;
      const tempItem = state.cart.find((i) => i.id === id + mainColor);
      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + mainColor) {
            let incrementAmount = cartItem.amount + amount;
            if (incrementAmount > cartItem.stock) {
              incrementAmount = cartItem.stock;
            }
            return { ...cartItem, amount: incrementAmount };
          } else {
            return cartItem;
          }
        });
        return { ...state, cart: tempCart };
      } else {
        const newItem = {
          id: id + mainColor,
          name,
          mainColor,
          amount,
          image: images[0].url,
          price,
          stock,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }

    case TOGGLE_CART_ITEM_AMOUNT:
      const tempCart = state.cart.map((item) => {
        if (item.id === payload.id) {
          if (payload.value === "increment") {
            let newAmount = item.amount + 1;
            if (newAmount > item.stock) {
              newAmount = item.stock;
            }
            return { ...item, amount: newAmount };
          }
          if (payload.value === "decrement") {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, amount: newAmount };
          }
        } else {
          return item;
        }
      });

      return { ...state, cart: tempCart };

    case CLEAR_CART:
      return { ...state, cart: [], totalAmount: 0, totalItems: 0 };

    case REMOVE_CART_ITEM:
      const updatedCart = state.cart.filter((item) => item.id !== payload);
      return { ...state, cart: updatedCart };

    case COUNT_CART_TOTALS:
      const { totalItems, totalAmount } = state.cart.reduce(
        (total, cartItem) => {
          const { amount, price } = cartItem;
          total.totalItems += amount;
          total.totalAmount += price * amount;
          return total;
        },
        {
          totalItems: 0,
          totalAmount: 0,
        }
      );
      return { ...state, totalItems, totalAmount };

    default:
      throw new Error(`No Matching "${type}" - action type`);
  }
};

export default cart_reducer;
