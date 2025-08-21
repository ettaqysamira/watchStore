import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import HomePageApp from "./pages/homePage/App";
import ProductDetailsApp from "./pages/product-detail/ProductDetailsApp";
import { CartProvider } from "./components/elements/PanierSide";
import PanierSide from "./components/elements/PanierSide";
import ShoppingCart from "./pages/shopping-cart";
import DeliveryInformationForm from "./pages/delivery-information";

const Routes = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="route-container">
          <RouterRoutes>
            <Route path="/" element={<HomePageApp />} />
            <Route path="/homepage" element={<HomePageApp />} />
            <Route path="/product-detail" element={<ProductDetailsApp />} />
            <Route path="/product-detail/:id" element={<ProductDetailsApp />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/delivery-information" element={<DeliveryInformationForm />} />

          </RouterRoutes>
          <PanierSide />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
};

export default Routes;
