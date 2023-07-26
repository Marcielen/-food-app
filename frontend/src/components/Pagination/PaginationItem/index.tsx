interface PaginationItemProps
  extends React.InputHTMLAttributes<HTMLButtonElement> {
  isCurrent?: boolean;
  bg?: string;
  opacity?: string;
  bgColor?: string;
}

export function PaginationItem({
  isCurrent = false,
  onClick,
  children,
  disabled,
  bg = "white",
  opacity = "1",
  color = "black",
  id,
  bgColor = "secondary.500",
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <button
        className="w-7 h-7 text-sm"
        disabled
        style={{
          color,
          cursor: disabled ? "default" : "pointer",
          background: disabled ? bgColor : "",
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className="w-7 h-7 text-sm"
      style={{
        background: bg,
        color,
        opacity,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
