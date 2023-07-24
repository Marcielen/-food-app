import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";

interface SelectProps {
  label?: string;
  name: string;
  type?: string;
  className?: string;
  placeholder?: string;
  valueIsObject?: boolean;
  isMulti?: boolean;
  isDisabled?: boolean;
  options: {
    label: string;
    value: string;
  }[];
}

export const SelectDefault = ({
  label,
  isMulti = false,
  name,
  isDisabled = false,
  options,
  className,
  placeholder,
  valueIsObject = false,
}: SelectProps) => {
  const {
    formState: { errors },
    setValue,
  } = useFormContext();

  const messageErros = errors[name]?.message;

  const formatValue = (value: string) => {
    if (value) {
      const optionSelected = options.find((item) => item.value === value);

      return optionSelected?.value;
    }
    return null;
  };

  return (
    <Controller
      name={name}
      render={({ field: { onBlur, value, ref } }) => {
        return (
          <div className={`${className} relative`}>
            {label && (
              <label className="text-[14px] font-bold text-gray-500 ">
                {label}
              </label>
            )}

            <Select
              ref={ref}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  ":hover": {
                    border: "2px solid #e5e7eb",
                    boxShadow: "none",
                  },
                  ":active": {
                    border: "2px solid #e5e7eb",
                    boxShadow: "none",
                  },
                  border: "2px solid #e5e7eb",
                  borderRadius: "5px",
                  boxShadow: "none",
                  height: "32px",
                }),

                indicatorSeparator: () => ({ display: "none" }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? "#ccc" : "inherit",
                  color: "black",
                  ":hover": {
                    backgroundColor: "#e5e7eb",
                  },
                  ":active": {
                    backgroundColor: "none",
                    boxShadow: "none",
                  },
                }),
              }}
              isDisabled={isDisabled}
              isMulti={isMulti}
              onBlur={onBlur}
              options={options as any}
              value={options.find((item) => item.value === value)}
              placeholder={placeholder}
              onChange={(e) => {
                if (!valueIsObject) {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  setValue(name, formatValue(e.value));
                }
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
