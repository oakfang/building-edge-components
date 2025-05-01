import { cva } from "@/ui/utils";
import type { VariantProps } from "cva";
import type { ComponentProps, FC } from "react";

export const button = cva({
  base: "flex items-center justify-center cursor-pointer select-none disabled:opacity-60 disabled:cursor-not-allowed disabled:grayscale-25 transition-all duration-150 active:scale-[98%]",
  variants: {
    intent: {
      primary:
        "bg-primary text-primary-foregrounnd hover:saturate-150 focus-visible:saturate-150",
      risky:
        "bg-red-500 text-primary-foregrounnd hover:bg-red-700 focus-visible:bg-red-700",
      outline:
        "ring ring-inset ring-current hover:text-primary focus-visible:text-primary",
      clear: "hover:text-primary focus-visible:text-primary",
    },
    size: {
      normal: "rounded p-2 md:min-w-36",
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
