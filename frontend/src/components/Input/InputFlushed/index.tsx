import { Controller } from "react-hook-form";

type InputFlushedProps = {
  label?: string;
  name: string;
  type?: string;
  className?: string;
};

export const InputFlushed = ({
  label,
  name,
  type = "text",
  className,
}: InputFlushedProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => {
        return (
          <div className={`${className} relative`}>
            <input
              type={type}
              ref={ref}
              id="username"
              onBlur={onBlur}
              value={value}
              className=" px-2 bg-transparent rounded-md w-full border-white border-2 py-1 focus:outline-none  transition-black peer"
              onChange={onChange}
            />
            <label
              className={`absolute bg-none left-2 top-1 text-white cursor-text transition-all ${
                value !== undefined && value !== ""
                  ? "text-xs -top-[10px] bg-[#1D1D2E] px-1 left-1"
                  : ""
              }`}
            >
              {label}
            </label>
          </div>
        );
      }}
    />
  );
};
