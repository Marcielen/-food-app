import Banner from "assets/banner-.jpg";
import Logo from "assets/logo.svg";

type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="inset-0 h-screen w-auto bg-primary flex">
      <div className="flex  justify-center items-center w-full h-full">
        <div
          className="rounded-lg px-5 relative text-white w-[370px] h-[400px]"
          style={{
            boxShadow: "0px 0px 10px 0px rgb(116, 119, 114)",
          }}
        >
          <span className="animate-animateTop absolute top-0 left-0 w-0 h-3 bg-red-800"></span>
          <span className="animate-animateRight top-0 right-0 absolute w-3 h-0 bg-fuchsia-700"></span>
          <span className="animate-animateBottom right-0 absolute bottom-0 h-3 bg-indigo-500"></span>
          <span className="animate-animateLeft left-0 bottom-0 absolute w-3 h-0 bg-sky-600"></span>
          <div className="flex justify-center pt-2 pb-2 h-[100px] w-full ">
            <img className="h-[100px] w-[500px]" src={Logo} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
