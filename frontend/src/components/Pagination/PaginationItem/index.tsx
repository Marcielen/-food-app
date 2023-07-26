interface PaginationItemProps
  extends React.InputHTMLAttributes<HTMLButtonElement> {
  isCurrent?: boolean;
}

export function PaginationItem({
  isCurrent = false,
  onClick,
  children,
  disabled,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <button
        className="w-7 h-7 text-sm rounded-md disabled:cursor-default disabled:text-gray-400"
        disabled
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className="w-7 h-7 rounded-md hover:text-white text-sm hover:bg-primary"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
