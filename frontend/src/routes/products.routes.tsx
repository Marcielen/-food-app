import { Route } from "react-router-dom";

import { ConstantRoutes } from "constants/constantsRoutes";

import { Products } from "pages/Products";

import ProtectedRoute from "./ProtectedRoute";

export const ProductsRoute = [
  <Route
    key={ConstantRoutes.PRODUCT}
    path={ConstantRoutes.PRODUCT}
    element={
      <ProtectedRoute
        breadcrumb="Product registration"
        component={<Products />}
      />
    }
  />,
];
