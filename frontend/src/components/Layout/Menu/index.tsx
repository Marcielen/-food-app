import { useAuthContext } from "contexts/AuthContext";
import { useState } from "react";
import {
  HiMiniArchiveBox,
  HiBars3,
  HiOutlineClipboardDocumentCheck,
  HiMiniPower,
  HiChartBarSquare,
} from "react-icons/hi2";

import { ItemMenu } from "./ItemMenu";
import { Tooltip } from "components/Tooltip";
import { ConstantRoutes } from "constants/constantsRoutes";

export const Menu = () => {
  const [openMenu, setOpenMenu] = useState(true);

  const { valueUser } = useAuthContext();

  const nameUser = valueUser?.name || "";

  const initialLetter = nameUser.slice(0, 1);

  return (
    <div
      className={`h-full pt-3  text-white mr-10 ${
        openMenu
          ? "w-[260px] transition-width duration-500"
          : "w-[70px] transition-width duration-500"
      } bg-primary`}
    >
      <div className="h-[90%]">
        <div className="flex border-b-[1px] items-center ml-2 pl-1 pb-4 mr-2 mb-3">
          <div className="bg-secondary text-xl pl-2 pr-2 pt-[2px] pb-1 rounded-[5px]">
            {initialLetter}
          </div>
          {openMenu && <p className="ml-2 text-lg">{nameUser}</p>}
        </div>

        <div
          onClick={() => setOpenMenu(!openMenu)}
          className="flex pl-4 pt-2 pb-2 cursor-pointer hover:text-[#FF7426] hover:bg-primary100"
        >
          <HiBars3 size={25} />
        </div>

        <ItemMenu
          route={ConstantRoutes.DASHBOARD}
          openMenu={openMenu}
          description="Dashboard"
        >
          <HiChartBarSquare size={25} />
        </ItemMenu>
        <ItemMenu
          route={ConstantRoutes.PRODUCT}
          openMenu={openMenu}
          description="Product registration"
        >
          <HiMiniArchiveBox size={25} />
        </ItemMenu>
        <ItemMenu
          route={ConstantRoutes.ORDERS}
          openMenu={openMenu}
          description="Orders"
        >
          <HiOutlineClipboardDocumentCheck size={25} />
        </ItemMenu>
      </div>

      <div
        data-tooltip-id="sing-up"
        className="flex cursor-pointer items-center hover:bg-primary100 hover:text-[#FF7426]  pl-1 pt-2 pb-2"
      >
        <div className="text-xl pl-2 pr-2 mt-1  rounded-[5px]">
          <HiMiniPower size={25} />
        </div>
        <div
          className={`mt-1 ${openMenu ? "opacity-100" : "opacity-0"}`}
          style={{ transition: "opacity 0.5s" }}
        >
          {openMenu && <p className="ml-2  whitespace-nowrap">Sing up</p>}
        </div>
      </div>

      {!openMenu && <Tooltip id="sing-up" description="Sing up" />}
    </div>
  );
};
