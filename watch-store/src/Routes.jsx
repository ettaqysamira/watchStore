import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import HomePageApp from "./pages/homePage/App";


const Routes = () => {
  return (
    <BrowserRouter>
        <RouterRoutes>
        <Route path="/" element={<HomePageApp />} />
        <Route path="/homepage" element={<HomePageApp />} />


         </RouterRoutes>
      </BrowserRouter>
  )
}
export default Routes