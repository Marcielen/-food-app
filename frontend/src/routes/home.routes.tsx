import { Route } from "react-router-dom";

import { ConstantRoutes } from "constants/constantsRoutes";

import { Home } from "pages/home";

import ProtectedRoute from "./ProtectedRoute";

export const HomeRouter = [
  <Route
    key={ConstantRoutes.HOME}
    path={ConstantRoutes.HOME}
    element={<ProtectedRoute component={<Home />} />}
  />,
];
