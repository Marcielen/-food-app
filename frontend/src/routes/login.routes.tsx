import { Route } from "react-router-dom";

import { ConstantRoutes } from "constants/constantsRoutes";

import { Login } from "pages/Login";

export const LoginRoutes = [
  <Route
    key={ConstantRoutes.LOGIN}
    path={ConstantRoutes.LOGIN}
    element={<Login />}
  />,
];
