import { Route } from "react-router-dom";

import { ConstantRoutes } from "constants/constantsRoutes";

import { Register } from "pages/Register";

export const RegisterRoutes = [
  <Route
    key={ConstantRoutes.REGISTER}
    path={ConstantRoutes.REGISTER}
    element={<Register />}
  />,
];
