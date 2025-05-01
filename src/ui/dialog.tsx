import * as EdgeDialog from "@/edge/dialog.base";
import type { VariantProps } from "cva";
import { XIcon } from "lucide-react";
import type { ComponentProps, FC } from "react";
import { button } from "./button";
import { cva } from "./utils";

export const Root = EdgeDialog.Root;

export const Command: FC<
  ComponentProps<typeof EdgeDialog.Command> & VariantProps<typeof button>
> = ({ intent, size, className, ...props }) => {
  return (
    <EdgeDialog.Command
      className={button({ intent, size, className })}
      {...props}
    />
  );
};

export const ShowPopover: FC<Omit<ComponentProps<typeof Command>, "cmd">> = (
  props
) => <Command cmd="show-popover" {...props} />;

export const HidePopover: FC<Omit<ComponentProps<typeof Command>, "cmd">> = (
  props
) => <Command cmd="hide-popover" {...props} />;

export const TogglePopover: FC<Omit<ComponentProps<typeof Command>, "cmd">> = (
  props
) => <Command cmd="toggle-popover" {...props} />;

export const ShowModal: FC<Omit<ComponentProps<typeof Command>, "cmd">> = (
  props
) => <Command cmd="show-modal" {...props} />;

export const Close: FC<Omit<ComponentProps<typeof Command>, "cmd">> = (
  props
) => <Command cmd="close" {...props} />;

export const Yes: FC<Omit<ComponentProps<typeof Command>, "cmd" | "value">> = (
  props
) => <Command cmd="close" value="yes" {...props} />;

export const No: FC<Omit<ComponentProps<typeof Command>, "cmd" | "value">> = (
  props
) => <Command cmd="close" value="no" {...props} />;

export const dialog = cva({
  base: "bg-elevated open:flex text-start flex-col p-[calc(var(--spacing)*var(--size))] gap-[calc(var(--spacing)*var(--size))] [--size:2]",
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
    position: {
      center: "m-auto",
    },
    backdrop: {
      darken: "backdrop:bg-transparent backdrop:backdrop-brightness-50",
    },
    animation: {
      unset: null,
      pop: "opacity-0 scale-95 open:opacity-100 open:scale-100 starting:open:!opacity-0 starting:open:!scale-95",
    },
  },
  compoundVariants: [
    {
      size: ["sm", "md", "lg", "xl"],
      class: "sm:min-w-sm sm:max-w-md sm:rounded-sm sm:[--size:3] sm:shadow-sm",
    },
    {
      size: ["md", "lg", "xl"],
      class: "md:min-w-md md:rounded-md md:max-w-lg md:[--size:4] md:shadow-md",
    },
    {
      size: ["lg", "xl"],
      class: "lg:min-w-lg lg:rounded-lg lg:max-w-xl lg:[--size:5] lg:shadow-lg",
    },
    {
      size: ["xl"],
      class: "xl:min-w-xl xl:rounded-xl xl:[--size:6] xl:shadow-xl",
    },
    {
      animation: ["pop"],
      class: "transition-all transition-discrete",
    },
  ],
  defaultVariants: {
    size: "md",
    position: "center",
    backdrop: "darken",
    animation: "pop",
  },
});

export const Dialog: FC<
  ComponentProps<"dialog"> & VariantProps<typeof dialog>
> = ({ className, size, position, backdrop, children, ...props }) => {
  return (
    <EdgeDialog.Dialog
      className={dialog({ size, position, backdrop, className })}
      {...props}
    >
      {children}
    </EdgeDialog.Dialog>
  );
};

export const dialogHeader = cva({
  base: "flex items-center justify-between [&>h2]:text-xl [&>h2]:font-semibold",
});

export const DialogHeader: FC<ComponentProps<"h2">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <header className={dialogHeader({ className })} {...props}>
      <EdgeDialog.DialogTitle>{children}</EdgeDialog.DialogTitle>
      <Close intent="clear" size="icon" aria-label="Close">
        <XIcon />
      </Close>
    </header>
  );
};

export const DialogDescription = EdgeDialog.DialogDescription;

export const dialogFooter = cva({
  base: "flex justify-end items-center gap-[inherit]",
});

export const DialogFooter: FC<ComponentProps<"footer">> = ({
  className,
  ...props
}) => <footer className={dialogFooter({ className })} {...props} />;

export const ConfirmationDialog: FC<
  ComponentProps<typeof EdgeDialog.ConfirmationDialog> &
    VariantProps<typeof dialog>
> = ({ className, size, position, backdrop, ...props }) => {
  return (
    <EdgeDialog.ConfirmationDialog
      className={dialog({ size, position, backdrop, className })}
      {...props}
    />
  );
};
