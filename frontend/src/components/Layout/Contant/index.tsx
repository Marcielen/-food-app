import { Header } from "../Header";
import { Menu } from "../Menu";

type ContantProps = {
  children: React.ReactNode;
};

export const Contant = ({ children }: ContantProps) => {
  return (
    <div className="flex h-[100vh]">
      <Menu />
      <div className="w-[100vw]  pr-10">
        <Header />
        <div className="px-3 pt-5 h-[calc(100%-64px)]">{children}</div>
      </div>
    </div>
  );
};
