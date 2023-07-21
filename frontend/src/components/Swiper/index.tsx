import React from "react";
import * as SwitchRadix from "@radix-ui/react-switch";
import { Controller } from "react-hook-form";

type SwitchProps = {
  name: string;
  label: string;
};

export const Switch = ({ name, label }: SwitchProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <div className="items-center">
            {label && (
              <label className="text-[14px] font-bold text-gray-500 ">
                {label}
              </label>
            )}
            <div>
              <SwitchRadix.Root
                onCheckedChange={onChange}
                checked={value}
                className="w-[42px] h-[25px] bg-blackA9 rounded-full  relative border-[1px] bg-gray-400 border-gray-50  data-[state=checked]:bg-green-500 outline-none cursor-default"
                id="airplane-mode"
              >
                <SwitchRadix.Thumb className="block w-[20px] h-[20px] border-[1px] border-gray-50 bg-white rounded-full  transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
              </SwitchRadix.Root>
            </div>
          </div>
        );
      }}
    />
  );
};
