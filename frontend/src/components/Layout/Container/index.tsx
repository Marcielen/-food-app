import Banner from "assets/banner-.jpg";
import Logo from "assets/logo.svg";

type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className=" inset-0 hidden h-screen w-auto  bg-[#1D1D2E;] lg:flex">
      <div className="flex justify-center items-center w-full h-full">
        <div className="rounded-lg text-white w-[340px] h-[340px]">
          <div className="flex justify-center h-[100px] w-full ">
            <img className="h-[100px] w-[500px]" src={Logo} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};