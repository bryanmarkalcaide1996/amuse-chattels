import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  AboutPage,
  AuthWrapper,
  CartPage,
  CheckoutPage,
  ErrorPage,
  HomePage,
  Products,
  SingleProductPage,
} from "./pages/index";

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          {/* Home Route */}
          <Route exact path="/" element={<HomePage />} />
          {/* About Route */}
          <Route path="/about" element={<AboutPage />} />
          {/* AuthWrapper Route */}
          <Route path="/auth" element={<AuthWrapper />} />
          {/* CartPage Route */}
          <Route path="/cart" element={<CartPage />} />
          {/* CheckoutPage Route */}
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* Products Route */}
          <Route path="products" element={<Products />}></Route>
          {/* SingleProductPage Route */}
          <Route path="/products/:id" element={<SingleProductPage />} />
          {/* Non-Existent Route */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
