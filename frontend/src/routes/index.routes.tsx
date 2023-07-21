import { Routes } from "react-router-dom";

import { LoginRoutes } from "./login.routes";
import { RegisterRoutes } from "./register.routes";
import { DashboardRoute } from "./dashboard.routes";
import { ProductsRoute } from "./products.routes";
import { OrdersRoutes } from "./orders.routes";

export const RoutesContent = () => {
  return (
    <Routes>
      {LoginRoutes}
      {RegisterRoutes}
      {DashboardRoute}
      {ProductsRoute}
      {OrdersRoutes}
    </Routes>
  );
};
