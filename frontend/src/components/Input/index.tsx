import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { HiMagnifyingGlass } from "react-icons/hi2";

type InputProps = {
  label?: string;
  name: string;
  type?: string;
  className?: string;
  leftElement?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
  defaultValue?: string | number;
  onEnterKeyPress?: (value: string) => void;
};

export const Input = ({
  label,
  name,
  type,
  className,
  isDisabled = false,
  onEnterKeyPress,
  leftElement,
  placeholder,
  defaultValue,
}: InputProps) => {
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const valueInput = watch(name);
  const valueIsUndefined = valueInput === undefined || valueInput === "";
  const messageErros = errors[name]?.message;

  useEffect(() => {
    setValue(name, defaultValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue, setValue]);

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value, ref } }) => {
        return (
          <div className={`${className} relative`}>
            {label && (
              <label className="text-[14px] font-bold text-gray-500 ">
                {label}
              </label>
            )}
            {leftElement && (
              <div className="absolute cursor-pointer hover:opacity-[0.8] top-[10px] z-10 left-[14px] flex justify-start">
                <HiMagnifyingGlass />
              </div>
            )}
            <input
              ref={ref}
              onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter" && onEnterKeyPress) {
                  e.currentTarget.value = e.currentTarget.value.trim();

                  onEnterKeyPress(e.currentTarget.value);
                }
              }}
              onBlur={onBlur}
              disabled={isDisabled}
              value={value}
              type={type}
              placeholder={placeholder}
              className={`px-2 ${
                leftElement ? "pl-9" : ""
              } bg-transparent disabled:bg-gray-300 disabled:text-black rounded-md w-full border-2 border-gray-300  py-1 focus:outline-none  transition-black peer`}
              onChange={onChange}
            />

            {valueIsUndefined && (
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
