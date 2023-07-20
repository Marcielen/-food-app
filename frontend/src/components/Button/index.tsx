interface ButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string | undefined;
  type?: "button";
}

export const Button = ({ label, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={`bg-secondary w-full py-2 rounded-md hover:opacity-[0.8] ${className}`}
      {...rest}
    >
      {label}
    </button>
  );
};
