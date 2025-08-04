import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import GestionStockApp from "./pages/watch-stock/gestionStockApp";
import AddWatchForm from "./pages/watch-stock/components/FormAddWatch";

const Routes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={< GestionStockApp/>} />
        <Route path="/stock-management" element={<GestionStockApp />} />
        <Route path="/watch-form" element={<AddWatchForm />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;