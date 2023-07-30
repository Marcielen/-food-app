import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";
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
  decimalScale?: number;
};

export const InputNumber = ({
  label,
  name,
  type,
  className,
  isDisabled = false,
  onEnterKeyPress,
  leftElement,
  placeholder,
  defaultValue,
  decimalScale = 2,
}: InputProps) => {
  const {
    formState: { errors },
    setValue,
  } = useFormContext();

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

            <div className="absolute bg-gray-200 h-[32px] w-[35px] rounded-tl-sm rounded-bl-sm left-[1.5px] top-[26px] cursor-pointer hover:opacity-[0.8] z-10 flex justify-start">
              <div className="flex justify-center h-full w-full items-center text-gray-500">
                $
              </div>
            </div>

            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={decimalScale}
              allowNegative={false}
              allowLeadingZeros={false}
              fixedDecimalScale={true}
              customInput={(inputProps) => (
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
                  } text-right bg-transparent disabled:bg-gray-300 disabled:text-black rounded-md w-full border-2 border-gray-300  py-1 focus:outline-none  transition-black peer`}
                  onChange={onChange}
                  {...inputProps}
                />
              )}
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
