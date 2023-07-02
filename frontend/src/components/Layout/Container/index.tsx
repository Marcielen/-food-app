import Banner from "assets/banner-.jpg";
import Logo from "assets/logo.svg";

type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="inset-0 hidden h-screen w-auto bg-primary  lg:flex">
      <div className="flex  justify-center items-center w-full h-full">
        <div
          className="rounded-lg px-5 relative text-white w-[370px] h-[400px]"
          style={{
            boxShadow: "0px 0px 10px 0px rgb(116, 119, 114)",
          }}
        >
          <div className="bg-[red] absolute left-[8%] animate-span-hand h-[3px] rounded-full w-[100px]" />
          <div className="bg-[green] right-[8%] absolute animate-span2-hand h-[3px] rounded-full w-[100px]" />
          <div className="flex justify-center pt-2 pb-2 h-[100px] w-full ">
            <img className="h-[100px] w-[500px]" src={Logo} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
