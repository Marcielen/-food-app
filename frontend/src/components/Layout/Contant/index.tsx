import { Header } from "../Header";
import { Menu } from "../Menu";

type ContantProps = {
  children: React.ReactNode;
};

export const Contant = ({ children }: ContantProps) => {
  return (
    <div className="flex h-[100vh]">
      <Menu />
      <div>
        <Header />
        {children}
      </div>
    </div>
  );
};
