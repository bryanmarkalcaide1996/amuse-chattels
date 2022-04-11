import React from "react";
import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";
export const links = [
  {
    id: 1,
    text: "home",
    url: "/",
  },
  {
    id: 2,
    text: "about",
    url: "/about",
  },
  {
    id: 3,
    text: "products",
    url: "/products",
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: "mission",
    text: "Our mission is to provide high-quality furniture that will make your safe haven more comfortable.",
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: "vision",
    text: "Our Vision is to become a leading international furniture manufacturer providing innovative and high-quality products that will add comfort to your home",
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: "Satisfy Customers' needs",
    text: "We pay close attention to our customers' preferences and specifications. We place a premium on the quality of our products, which necessitates diligence and commitment. We work hard to develop long-term relationships with our clients.",
  },
];

export const products_url = "https://course-api.com/react-store-products";

export const single_product_url = `https://course-api.com/react-store-single-product?id=`;
