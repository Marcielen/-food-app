import { Routes } from "react-router-dom";

import { LoginRoutes } from "./login.routes";
import { RegisterRoutes } from "./register.routes";
import { DashboardRoute } from "./dashboard.routes";
import { ProductsRoute } from "./products.routes";
import { OrdersRoutes } from "./orders.routes";
import { OrdersPadRoutes } from "./orders-pad.routes";
import { PayRoutes } from "./pay.routes";

export const RoutesContent = () => {
  return (
    <Routes>
      {LoginRoutes}
      {RegisterRoutes}
      {DashboardRoute}
      {ProductsRoute}
      {OrdersRoutes}
      {OrdersRoutes}
      {OrdersPadRoutes}
      {PayRoutes}
    </Routes>
  );
};
