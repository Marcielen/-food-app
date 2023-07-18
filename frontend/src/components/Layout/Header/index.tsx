import { useLayoutContext } from "contexts/LayoutContext";
import Logo from "assets/logo.svg";

export const Header = () => {
  const { breadcrumbs } = useLayoutContext();
  return (
    <div className="flex font-bold text-[#FF7426] h-[64px] px-3 items-center border-b-2 justify-between w-full">
      <p className="text-lg">{breadcrumbs}</p>
      <div className="flex justify-center">
        <img className=" w-[120px]" src={Logo} />
      </div>
    </div>
  );
};
