import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { HiMagnifyingGlass } from "react-icons/hi2";

type InputProps = {
  label?: string;
  name: string;
  type?: string;
  className?: string;
  leftElement?: boolean;
  placeholder?: string;
};

export const Input = ({
  label,
  name,
  type,
  className,
  leftElement,
  placeholder,
}: InputProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const messageErros = errors[name]?.message;

  return (
    <Controller
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => {
        return (
          <div className={`${className} relative`}>
            {label && (
              <label className="text-[14px] font-bold text-gray-500 ">
                {label}
              </label>
            )}
            {leftElement && (
              <div className="absolute cursor-pointer hover:opacity-[0.8] top-[10px] z-20 left-[14px] flex justify-start">
                <HiMagnifyingGlass />
              </div>
            )}
            <input
              ref={ref}
              onBlur={onBlur}
              value={value}
              type={type}
              placeholder={placeholder}
              className={`px-2 ${
                leftElement ? "pl-9" : ""
              } bg-transparent rounded-md w-full border-primary border-2 py-1 focus:outline-none  transition-black peer`}
              onChange={onChange}
            />

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
