interface ButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string | undefined;
  type?: "button";
  typeConfirm?: boolean;
}

export const Button = ({
  label,
  typeConfirm = false,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`${
        typeConfirm ? "bg-green-500" : "bg-secondary"
      } w-full py-2 rounded-md hover:opacity-[0.8] ${className}`}
      {...rest}
    >
      {label}
    </button>
  );
};
