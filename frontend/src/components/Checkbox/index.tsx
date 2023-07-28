import * as CheckboxRadix from "@radix-ui/react-checkbox";
import { Controller } from "react-hook-form";
import { HiCheck } from "react-icons/hi2";

interface CheckboxProps extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
}

export const Checkbox = ({ name, ...rest }: CheckboxProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <div className="flex items-center">
            <CheckboxRadix.Root
              className={`hover:opacity-[0.5] ${
                value === true ? "bg-secondary" : "bg-white"
              } border-2 border-gray-300 flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] outline-none`}
              id="c1"
              value={value}
              onCheckedChange={onChange}
              {...rest}
            >
              <CheckboxRadix.Indicator
                className={`${value === true ? "text-white" : "text-black"}`}
              >
                <HiCheck />
              </CheckboxRadix.Indicator>
            </CheckboxRadix.Root>
          </div>
        );
      }}
    />
  );
};
