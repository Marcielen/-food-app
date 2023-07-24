import { Route } from "react-router-dom";

import { ConstantRoutes } from "constants/constantsRoutes";

import ProtectedRoute from "./ProtectedRoute";

import { OrdersPad } from "pages/OrdersPad";

export const OrdersPadRoutes = [
  <Route
    key={ConstantRoutes.ORDERS_PAD}
    path={ConstantRoutes.ORDERS_PAD}
    element={
      <ProtectedRoute breadcrumb="Orders pad" component={<OrdersPad />} />
    }
  />,
];
