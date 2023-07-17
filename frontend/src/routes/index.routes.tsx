import { Routes } from "react-router-dom";

import { LoginRoutes } from "./login.routes";
import { RegisterRoutes } from "./register.routes";
import { HomeRouter } from "./home.routes";

export const RoutesContent = () => {
  return (
    <Routes>
      {LoginRoutes}
      {RegisterRoutes}
      {HomeRouter}
    </Routes>
  );
};
