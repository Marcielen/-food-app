import { Routes } from "react-router-dom";

import { LoginRoutes } from "./login.routes";
import { RegisterRoutes } from "./register.routes";

export const RoutesContent = () => {
  return (
    <Routes>
      {LoginRoutes}
      {RegisterRoutes}
    </Routes>
  );
};
