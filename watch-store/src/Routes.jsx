import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import HomePageApp from "./pages/homePage/App";
import ProductDetailsApp from "./pages/product-detail/ProductDetailsApp";


const Routes = () => {
  return (
    <BrowserRouter>
        <RouterRoutes>
        <Route path="/" element={<HomePageApp />} />
        <Route path="/homepage" element={<HomePageApp />} />
        <Route path="/product-detail" element={<ProductDetailsApp />} />
        <Route path="/product-detail/:id" element={<ProductDetailsApp />} />



         </RouterRoutes>
      </BrowserRouter>
  )
}
export default Routes