interface ButtonLinkProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string | undefined;
  type?: "button";
}

export const ButtonLink = ({ label, className, ...rest }: ButtonLinkProps) => {
  return (
    <button className={`${className} w-full hover:opacity-[0.6]`} {...rest}>
      {label}
    </button>
  );
};
