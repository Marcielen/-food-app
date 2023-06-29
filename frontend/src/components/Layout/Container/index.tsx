import Banner from "assets/banner.jpg";

type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return (
    <div
      className=" inset-0 hidden h-screen w-auto  via-transparent to-transparent bg-cover bg-no-repeat lg:flex"
      style={{
        backgroundPosition: "center",
        backgroundImage: `url(${Banner})`,
      }}
    >
      {children}
    </div>
  );
};
