import { Tooltip as EdgeTooltip } from "@/edge/tooltip.base";
import type { VariantProps } from "cva";
import type { ComponentProps, FC } from "react";
import { cva } from "./utils";

const tooltip = cva({
  base: "absolute inset-[unset] bg-elevated shadow-sm px-2 py-1 rounded",
  variants: {
    placement: {
      "block:start": "bottom-[anchor(top)]",
      "block:end": "top-[anchor(bottom)]",
      "inline:start": "right-[anchor(left)]",
      "inline:end": "left-[anchor(right)]",
    },
    animation: {
      unset: null,
      fade: "opacity-0 open:opacity-100 starting:open:opacity-0",
    },
  },
  compoundVariants: [
    {
      placement: ["block:start", "block:end"],
      class: "[position-try-fallbacks:flip-block] [justify-self:anchor-center]",
    },
    {
      placement: ["inline:start", "inline:end"],
      class: "[position-try-fallbacks:flip-inline] [align-self:anchor-center]",
    },
    {
      animation: ["fade"],
      class: "transition-all transition-discrete",
    },
  ],
  defaultVariants: {
    placement: "block:start",
    animation: "fade",
  },
});

export const Tooltip: FC<
  ComponentProps<typeof EdgeTooltip> & VariantProps<typeof tooltip>
> = ({ className, children, placement, animation, ...props }) => {
  return (
    <EdgeTooltip
      className={tooltip({ className, placement, animation })}
      {...props}
    >
      {children}
    </EdgeTooltip>
  );
};

export { Trigger, Root, TimedRoot, Timer } from "@/edge/tooltip.base";
