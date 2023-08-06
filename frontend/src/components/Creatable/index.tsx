import { Tooltip } from "components/Tooltip";
import { Controller, useFormContext } from "react-hook-form";
import { MdInfoOutline } from "react-icons/md";
import CreatableSelect from "react-select/creatable";

interface CreatableProps {
  label?: string;
  name: string;
  type?: string;
  className?: string;
  placeholder?: string;
  valueIsObject?: boolean;
  isMulti?: boolean;
  helperText?: string;
  onCreateOption?: (value: string) => void;
  options: {
    label: string;
    value: string;
  }[];
}

export const Creatable = ({
  label,
  isMulti = false,
  name,
  options,
  className,
  placeholder,
  onCreateOption,
  valueIsObject = false,
  helperText,
}: CreatableProps) => {
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
            <div
              className={`flex ${
                helperText ? "justify-between" : "justify-start"
              }`}
            >
              {label && (
                <label className="text-[14px] font-bold text-gray-500 ">
                  {label}
                </label>
              )}
              {helperText && (
                <div>
                  <MdInfoOutline data-tooltip-id="helper-Text" />
                  <Tooltip
                    width="300px"
                    height="100px"
                    id="helper-Text"
                    description={helperText}
                  />
                </div>
              )}
            </div>

            <CreatableSelect
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
              isMulti={isMulti}
              onBlur={onBlur}
              options={options as any}
              value={options.find((item) => item.value === value)}
              formatCreateLabel={(inputText) =>
                `Create category: "${inputText}"`
              }
              placeholder={placeholder}
              onChange={(e) => {
                if (!valueIsObject) {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  setValue(name, formatValue(e.value));
                }
              }}
              onCreateOption={onCreateOption}
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
