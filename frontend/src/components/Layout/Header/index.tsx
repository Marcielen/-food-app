import { useLayoutContext } from "contexts/LayoutContext";
import Logo from "assets/logo.svg";
import { useMediaQuery } from "hooks/useMediaQuery";

export const Header = () => {
  const { breadcrumbs } = useLayoutContext();
  const isMobile = useMediaQuery("(min-width: 640px)");
  console.log(breadcrumbs.length);
  return (
    <div className=" flex-col-reverse sm:flex-row flex font-bold overflow-x-hidden overflow-y-hidden text-secondary h-[64px] px-[1%] items-start sm:items-center border-b-2 justify-between w-full">
      <div className="flex">
        <p className="text-lg whitespace-nowrap ">
          {isMobile
            ? breadcrumbs
            : `${
                breadcrumbs.length <= 30
                  ? breadcrumbs
                  : `${breadcrumbs.slice(0, 30)}...`
              }`}
        </p>
      </div>
      <div className="flex justify-center">
        <img className="w-[120px] pt-3 sm:pt-0 " src={Logo} alt="Logo" />
      </div>
    </div>
  );
};
