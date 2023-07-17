import { Navigate } from "react-router-dom";

import { ConstantRoutes } from "constants/constantsRoutes";
import { parseCookies } from "nookies";
import { Contant } from "components/Layout/Contant";

export type ProtectedRouteProps = {
  component: JSX.Element;
};

export default function ProtectedRoute({ component }: ProtectedRouteProps) {
  const cookies = parseCookies(undefined);

  const isAuthenticated = cookies["@auth.token"];

  if (isAuthenticated) {
    return <Contant>{component}</Contant>;
  } else {
    return <Navigate to={ConstantRoutes.LOGIN} />;
  }
}
