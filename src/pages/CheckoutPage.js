import React, { useEffect } from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
import { useCartContext } from "../context/cart_context";
// extra imports

import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const CheckoutPage = () => {
  const { isAuthenticated } = useAuth0();
  const { cart } = useCartContext();
  const navigate = useNavigate();

  useEffect(() => {
    !isAuthenticated && navigate("/");
  });

  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page">
        {cart.length < 1 ? (
          <div className="empty">
            <h2>Your cart is currently empty</h2>
            <Link to="/products" className="btn">
              Shop Products
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
