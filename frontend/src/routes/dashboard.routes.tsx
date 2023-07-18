import { Route } from "react-router-dom";

import { ConstantRoutes } from "constants/constantsRoutes";

import { Dashboard } from "pages/Dashboard";

import ProtectedRoute from "./ProtectedRoute";

export const DashboardRoute = [
  <Route
    key={ConstantRoutes.DASHBOARD}
    path={ConstantRoutes.DASHBOARD}
    element={
      <ProtectedRoute breadcrumb="Dashboard" component={<Dashboard />} />
    }
  />,
];
