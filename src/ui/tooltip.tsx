import { Tooltip as EdgeTooltip } from "@/edge/tooltip.base";
import type { ComponentProps, FC } from "react";
import { cva } from "./utils";

const tooltip = cva({
  base: "justify-self-anchor-center absolute inset-[unset] bottom-[anchor(top)] [position-try-fallbacks:flip-block] bg-elevated shadow-sm px-2 py-1 rounded",
});

export const Tooltip: FC<ComponentProps<typeof EdgeTooltip>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <EdgeTooltip className={tooltip({ className })} {...props}>
      {children}
    </EdgeTooltip>
  );
};

export { Trigger, Root, TimedRoot, Timer } from "@/edge/tooltip.base";
