interface ButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string | undefined;
  type?: "button";
}

export const Button = ({ label, ...rest }: ButtonProps) => {
  return (
    <button
      className="bg-[#FF3F4B] w-full py-2 rounded-md hover:opacity-[0.8]"
      {...rest}
    >
      {label}
    </button>
  );
};
