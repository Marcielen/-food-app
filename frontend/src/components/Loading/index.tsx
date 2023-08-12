import { HTMLAttributes } from "react";
import { BeatLoader } from "react-spinners";

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  isHealth?: boolean;
}

export const Loading = ({
  size = 20,
  isHealth = false,
  ...rest
}: LoadingProps) => {
  return (
    <>
      <div className="absolute left-0 top-0 bg-[#413f3f] opacity-[0.7] h-[100vh] w-[100vw]" />

      <div
        className="absolute 
      top-[50%] left-[50%]  mr-[-50%] min-w-[100%] min-h-[100%]"
        style={{
          transform: "translate(-50%, -50%)",
          transition: "all ease 4s",
        }}
        {...rest}
      >
        <div
          className="absolute z-[998] top-[50%] left-[50%] mr-[-50%]"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="flex justify-center">
            <BeatLoader size={size} color="#FF7426" />
          </div>
          {isHealth && (
            <p className="font-weight text-[18px] mt-4 text-white">
              Website is loading, please wait 🙂
            </p>
          )}
        </div>
      </div>
    </>
  );
};
