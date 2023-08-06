import { Tooltip as ReactTooltip } from "react-tooltip";

type TooltipProps = {
  description: string;
  id: string;
  height?: string;
  width?: string;
};

export const Tooltip = ({ description, id, height, width }: TooltipProps) => {
  return (
    <ReactTooltip
      style={{
        background: "#FF7426",
        color: "#0c0116",
        fontWeight: "bold",
        height: height,
        width: width,
      }}
      className="z-40"
      id={id}
      place="right"
      content={description}
    />
  );
};
