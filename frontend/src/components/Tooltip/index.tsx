import { Tooltip as ReactTooltip } from "react-tooltip";

type TooltipProps = {
  description: string;
  id: string;
};

export const Tooltip = ({ description, id }: TooltipProps) => {
  return (
    <ReactTooltip
      style={{
        background: "#FF7426",
        color: "#0c0116",
        fontWeight: "bold",
      }}
      className="z-40"
      id={id}
      place="right"
      content={description}
    />
  );
};
