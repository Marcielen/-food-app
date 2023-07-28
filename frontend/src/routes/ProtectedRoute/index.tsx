import { Navigate } from "react-router-dom";

import { ConstantRoutes } from "constants/constantsRoutes";
import { parseCookies } from "nookies";
import { Contant } from "components/Layout/Contant";
import { useLayoutContext } from "contexts/LayoutContext";
import { useEffect } from "react";

export type ProtectedRouteProps = {
  component: JSX.Element;
  breadcrumb: string;
  isVisibleLayout?: boolean;
};

export default function ProtectedRoute({
  component,
  breadcrumb,
  isVisibleLayout = true,
}: ProtectedRouteProps) {
  const cookies = parseCookies(undefined);
  const { setBreadcrumbs } = useLayoutContext();

  const isAuthenticated = cookies["@auth.token"];

  useEffect(() => {
    setBreadcrumbs(breadcrumb);
  }, [breadcrumb, setBreadcrumbs]);

  if (isAuthenticated) {
    return isVisibleLayout ? <Contant>{component}</Contant> : <>{component}</>;
  } else {
    return <Navigate to={ConstantRoutes.LOGIN} />;
  }
}
