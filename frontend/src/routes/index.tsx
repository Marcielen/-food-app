import { Routes } from "react-router-dom";

import { LoginRoutes } from "./login.routes";

export const RoutesContent = () => {
  return <Routes>{LoginRoutes}</Routes>;
};
