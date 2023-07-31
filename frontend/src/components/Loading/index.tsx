import { HTMLAttributes } from "react";
import { BeatLoader } from "react-spinners";

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export const Loading = ({ size = 20, ...rest }: LoadingProps) => {
  return (
    <div
      className="absolute z-[998] bg-[rgba(255_255_255_0.7)] top-[50%] left-[50%] mr-[-50%] min-w-[100%] min-h-[100%]"
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
        <BeatLoader size={size} color="#FF7426" />
      </div>
    </div>
  );
};
