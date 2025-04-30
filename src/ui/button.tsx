import { cva } from "@/edge/utils";
import type { VariantProps } from "cva";
import type { ComponentProps, FC } from "react";

export const button = cva({
  base: "flex items-center justify-center cursor-pointer select-none",
  variants: {
    intent: {
      primary: "bg-primary text-primary-foregrounnd",
      risky: "bg-red-500 text-primary-foregrounnd",
      outline: "ring ring-inset ring-current",
      clear: "",
    },
    size: {
      normal: "rounded p-2 min-w-36",
      icon: "rounded-sm p-1 aspect-square",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "normal",
  },
});

export const Button: FC<
  ComponentProps<"button"> & VariantProps<typeof button>
> = ({ className, intent, size, children, ...props }) => {
  return (
    <button className={button({ intent, size, className })} {...props}>
      {children}
    </button>
  );
};
