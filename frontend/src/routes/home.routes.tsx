import { Route } from "react-router-dom";

import { ConstantRoutes } from "constants/constantsRoutes";

import { Register } from "pages/Register";

export const HomeRouter = [
  <Route key={ConstantRoutes.REGISTER} path="/teste" element={<Register />} />,
];
