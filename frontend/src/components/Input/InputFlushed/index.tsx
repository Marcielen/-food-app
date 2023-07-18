import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const {
    setFocus,
    formState: { errors },
  } = useFormContext();

  const inputIsPassword = type === "password";

  const messageErros = errors[name]?.message;

  return (
    <Controller
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => {
        const hasValue = value !== undefined && value !== "";
        return (
          <div className={`${className} relative`}>
            <input
              type={
                inputIsPassword
                  ? isPasswordVisible
                    ? "password"
                    : "text"
                  : type
              }
              ref={ref}
              id="username"
              onBlur={onBlur}
              value={value}
              className="bg-primary100 px-2 bg-transparent rounded-md w-full border-[#6D5779] border-2 py-1 focus:outline-none  transition-black peer"
              onChange={onChange}
            />
            <label
              onClick={() => {
                setFocus(name);
              }}
              className={`labelLogin absolute bg-none left-2 top-1 text-white cursor-text transition-all ${
                hasValue ? "text-xs top-[-10px] bg-primary px-[1px] left-1" : ""
              }`}
            >
              {label}
            </label>
            {inputIsPassword && (
              <div
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute cursor-pointer hover:opacity-[0.8] top-[9px] z-20 right-[14px] flex  justify-end"
              >
                {isPasswordVisible ? <FiEye /> : <FiEyeOff />}
              </div>
            )}

            {messageErros && (
              <div className="text-xs text-red-600">
                {messageErros as string}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};
