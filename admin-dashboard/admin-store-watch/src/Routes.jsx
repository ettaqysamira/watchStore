import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import GestionStockApp from "./pages/watch-stock/gestionStockApp";

const Routes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={< GestionStockApp/>} />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;