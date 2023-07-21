import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Tooltip } from "components/Tooltip";
import { ConstantRoutes } from "constants/constantsRoutes";

type ItemMenu = {
  children: React.ReactNode;
  openMenu: boolean;
  description: string;
  route: string;
};

export const ItemMenu = ({
  children,
  openMenu,
  description,
  route,
}: ItemMenu) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <>
      <div
        onClick={handleClick}
        data-tooltip-id={description}
        className={`flex pl-4 pt-2 pb-2 cursor-pointer hover:text-secondary hover:bg-primary100`}
      >
        <div>{children}</div>
        <div
          className={`${openMenu ? "opacity-100" : "opacity-0"}`}
          style={{ transition: "opacity 0.5s" }}
        >
          {openMenu && <p className="ml-3 whitespace-nowrap">{description}</p>}
        </div>
      </div>
      {!openMenu && <Tooltip id={description} description={description} />}
    </>
  );
};
