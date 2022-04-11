import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, { type, payload }) => {
  switch (type) {
    case LOAD_PRODUCTS:
      const maxPrice = Math.max(...payload.map((p) => p.price));
      return {
        ...state,
        filteredProducts: [...payload],
        allProducts: [...payload],
        filters: { ...state.filters, maxPrice: maxPrice, price: maxPrice },
      };
    case SET_GRIDVIEW:
      return {
        ...state,
        gridView: true,
      };
    case SET_LISTVIEW:
      return {
        ...state,
        gridView: false,
      };
    case UPDATE_SORT:
      return {
        ...state,
        sort: payload,
      };
    case SORT_PRODUCTS:
      const { sort, filteredProducts } = state;
      let temp = filteredProducts.slice();
      if (sort === "price-lowest") {
        temp = temp.sort((a, b) => a.price - b.price);
      }
      if (sort === "price-highest") {
        temp = temp.sort((a, b) => b.price - a.price);
      }
      if (sort === "name-a") {
        temp = temp.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (sort === "name-z") {
        temp = temp.sort((a, b) => b.name.localeCompare(a.name));
      }
      return {
        ...state,
        filteredProducts: temp,
      };
    case UPDATE_FILTERS:
      const { name, value } = payload;
      return {
        ...state,
        filters: { ...state.filters, [name]: value },
      };
    case FILTER_PRODUCTS:
      const { allProducts } = state;

      let tempProducts = allProducts.slice();
      const { text, category, company, color, price, freeShippingStat } =
        state.filters;

      // filter by text
      if (text) {
        tempProducts = tempProducts.filter((prod) => {
          return prod.name.toLowerCase().startsWith(text);
        });
      }

      // filter by category type
      if (category !== "all") {
        tempProducts = tempProducts.filter(
          (prod) => prod.category === category
        );
      }

      // filter by company name
      if (company !== "all") {
        tempProducts = tempProducts.filter((prod) => prod.company === company);
      }

      // filter by color
      if (color !== "all") {
        tempProducts = tempProducts.filter((prod) => {
          return prod.colors.find((clr) => clr === color);
        });
      }

      // filter by shipping Status
      if (freeShippingStat) {
        tempProducts = tempProducts.filter((prod) => prod.shipping === true);
      }

      // filter by price
      tempProducts = tempProducts.filter((prod) => prod.price <= price);

      return { ...state, filteredProducts: tempProducts };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.maxPrice,
          freeShippingStat: false,
        },
      };
    default:
      throw new Error(`No Matching "${type}" - action type`);
  }
};

export default filter_reducer;
