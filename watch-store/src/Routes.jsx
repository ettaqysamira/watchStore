import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import HomePageApp from "./pages/homePage/App";
import ProductDetailsApp from "./pages/product-detail/ProductDetailsApp";
import { CartProvider } from "./components/elements/PanierSide";
import PanierSide from "./components/elements/PanierSide";


const Routes = () => {
  return (
    <CartProvider>
       <div className="route-container">
        <BrowserRouter>
        <RouterRoutes>
        <Route path="/" element={<HomePageApp />} />
        <Route path="/homepage" element={<HomePageApp />} />
        <Route path="/product-detail" element={<ProductDetailsApp />} />
        <Route path="/product-detail/:id" element={<ProductDetailsApp />} />
        </RouterRoutes>
      </BrowserRouter>
       <PanierSide/>
       </div>
      
    </CartProvider>
    
  )
}
export default Routes