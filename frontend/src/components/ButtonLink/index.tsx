type ButtonLinkProps = {
  label: string;
  className?: string;
};

export const ButtonLink = ({ label, className }: ButtonLinkProps) => {
  return (
    <button className={`${className} w-full hover:opacity-[0.6]`}>
      {label}
    </button>
  );
};
