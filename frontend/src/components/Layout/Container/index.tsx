import Logo from "assets/teste.svg";

type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="inset-0 h-screen w-auto bg-primary flex">
      <div className="flex  justify-center items-center w-full h-full">
        <div
          className="rounded-lg px-5 relative text-white sm:w-[350px] w-[85%] h-[450px]"
          style={{
            boxShadow: "0px 0px 10px 0px rgb(116, 119, 114)",
          }}
        >
          <span className="animate-animateTop rounded-lg absolute top-0  left-0 w-0 h-1 bg-sky-600" />
          <span className="animate-animateRight rounded-lg top-0 right-0 absolute w-1 h-0 bg-fuchsia-700"></span>
          <span className="animate-animateBottom rounded-lg right-0 absolute bottom-0 h-1 bg-secondary"></span>
          <span className="animate-animateLeft rounded-lg left-0 bottom-0 absolute w-1 h-0 bg-pink-300"></span>
          <div className="flex justify-center pt-2 pb-2 h-[100px] w-full ">
            <img className="h-[100px] w-[250px]" src={Logo} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
