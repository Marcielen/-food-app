import { Route } from "react-router-dom";

import { ConstantRoutes } from "constants/constantsRoutes";

import { Pay } from "pages/Pay";

import ProtectedRoute from "./ProtectedRoute";

export const PayRoutes = [
  <Route
    key={ConstantRoutes.PAY}
    path={ConstantRoutes.PAY}
    element={
      <ProtectedRoute
        isVisibleLayout={false}
        breadcrumb=""
        component={<Pay />}
      />
    }
  />,
];
