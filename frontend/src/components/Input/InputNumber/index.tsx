import { ChangeEvent, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

type InputProps = {
  label?: string;
  name: string;
  type?: string;
  className?: string;
  isDisabled?: boolean;
  defaultValue?: string | number;
  decimalScale?: number;
};

export const InputNumber = ({
  label,
  name,
  className,
  isDisabled = false,
  defaultValue,
}: InputProps) => {
  const {
    formState: { errors },
    setValue,
  } = useFormContext();

  const messageErros = errors[name]?.message;

  function formatNumberWithPoints(value: string): string {
    const regexWithSingleZero = /^0\d/;

    const splitDecimal = value.split(".");
    const integerPart = splitDecimal[0];
    const decimalPart = splitDecimal[1];

    let valueIntegerPart = integerPart;

    if (regexWithSingleZero.test(integerPart)) {
      valueIntegerPart =
        integerPart.split("0")[1] === "" ? "0" : integerPart.split("0")[1];
    }

    let formattedIntegerPart = valueIntegerPart
      .split("")
      .reverse()
      .map((digit, index) => {
        return digit + (index > 0 && index % 3 === 0 ? "," : "");
      })
      .reverse()
      .join("");

    if (formattedIntegerPart.startsWith(".")) {
      formattedIntegerPart = formattedIntegerPart.slice(1);
    }

    const formattedValue = decimalPart
      ? `${formattedIntegerPart}.${decimalPart}`
      : formattedIntegerPart;

    return formattedValue;
  }

  const formatValue = (value: string) => {
    const cleanValue = value.replace(/[^\d]/g, "");
    const integerPart = cleanValue.slice(0, -2);
    const decimalPart = cleanValue.slice(-2);

    let formattedValue =
      (integerPart.length > 0 ? integerPart : "0") +
      (decimalPart.length > 0 ? "." + decimalPart : "");

    formattedValue = formatNumberWithPoints(formattedValue);
    return formattedValue;
  };

  useEffect(() => {
    setValue(name, defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue, setValue]);

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onBlur, value, ref } }) => {
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

            <input
              ref={ref}
              onBlur={onBlur}
              value={formatValue(value)}
              disabled={isDisabled}
              className={`px-2 text-right bg-transparent disabled:bg-gray-300 disabled:text-black rounded-md w-full border-2 border-gray-300  py-1 focus:outline-none  transition-black peer`}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue(name, formatValue(e.target.value)); // Atualize o valor usando setValue do useFormContext
              }}
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
