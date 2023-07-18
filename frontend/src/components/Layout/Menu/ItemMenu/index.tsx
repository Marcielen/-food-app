import { Tooltip } from "components/Tooltip";

type ItemMenu = {
  children: React.ReactNode;
  openMenu: boolean;
  description: string;
};

export const ItemMenu = ({ children, openMenu, description }: ItemMenu) => {
  return (
    <>
      <div
        data-tooltip-id={description}
        className={`flex pl-4 pt-2 pb-2 cursor-pointer hover:text-[#FF7426] hover:bg-primary100`}
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
