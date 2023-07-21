import { Route } from "react-router-dom";

import { ConstantRoutes } from "constants/constantsRoutes";

import ProtectedRoute from "./ProtectedRoute";
import { Orders } from "pages/Orders";

export const OrdersRoutes = [
  <Route
    key={ConstantRoutes.ORDERS}
    path={ConstantRoutes.ORDERS}
    element={
      <ProtectedRoute breadcrumb="Orders registration" component={<Orders />} />
    }
  />,
];
