import { useLayoutContext } from "contexts/LayoutContext";
import { Header } from "../Header";
import { Menu } from "../Menu";

type ContantProps = {
  children: React.ReactNode;
};

export const Contant = ({ children }: ContantProps) => {
  const { menuIsOpen } = useLayoutContext();

  return (
    <div
      style={{
        maxHeight: "100vh",
        maxWidth: "100vw",
        overflow: "hidden",
      }}
      className="flex h-[100vh] w-[100vw]"
    >
      <Menu />
      <div
        className={`${
          menuIsOpen
            ? "w-[calc(100vw-228px)]"
            : "w-[calc(100vw-78px)] transition-width duration-500"
        } ${
          menuIsOpen
            ? "lg:w-[calc(100vw-260px)]"
            : "lg:w-[calc(100vw-110px)] transition-width duration-500"
        } h-[100vh] pr-[2%]`}
      >
        <div className="w-full">
          <Header />
        </div>
        <div className="px-[1%] pt-5 w-full h-[calc(100%-64px)]">
          {children}
        </div>
      </div>
    </div>
  );
};
