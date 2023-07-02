type ButtonProps = {
  label: string;
};

export const Button = ({ label }: ButtonProps) => {
  return (
    <button className="bg-[#FF3F4B] w-full py-2 rounded-md hover:opacity-[0.8]">
      {label}
    </button>
  );
};
