import { Root as Slot } from "@radix-ui/react-slot";
import { type ComponentProps, type FunctionComponent, useState } from "react";
import { identifierFor, useIdentifier } from "./utils";

const DIALOG_FEATURE = Symbol("dialog");
const YES = "y";
const NO = "n";

export const Root = identifierFor(DIALOG_FEATURE);

export const Command: FunctionComponent<
  Omit<ComponentProps<"button">, "command" | "commandfor"> & {
    asChild?: boolean;
    cmd: CommandEvent["command"];
  }
> = ({ asChild, type = "button", cmd, ...props }) => {
  const id = useIdentifier(DIALOG_FEATURE);
  const Comp = asChild ? Slot : "button";
  return <Comp {...props} type={type} command={cmd} commandfor={id} />;
};

export const ShowPopover: FunctionComponent<
  Omit<ComponentProps<typeof Command>, "cmd">
> = (props) => <Command cmd="show-popover" {...props} />;

export const HidePopover: FunctionComponent<
  Omit<ComponentProps<typeof Command>, "cmd">
> = (props) => <Command cmd="hide-popover" {...props} />;

export const TogglePopover: FunctionComponent<
  Omit<ComponentProps<typeof Command>, "cmd">
> = (props) => <Command cmd="toggle-popover" {...props} />;

export const ShowModal: FunctionComponent<
  Omit<ComponentProps<typeof Command>, "cmd">
> = (props) => <Command cmd="show-modal" {...props} />;

export const Close: FunctionComponent<
  Omit<ComponentProps<typeof Command>, "cmd">
> = (props) => <Command cmd="close" {...props} />;

export const Yes: FunctionComponent<
  Omit<ComponentProps<typeof Command>, "cmd" | "value">
> = (props) => <Command cmd="close" value={YES} {...props} />;

export const No: FunctionComponent<
  Omit<ComponentProps<typeof Command>, "cmd" | "value">
> = (props) => <Command cmd="close" value={NO} {...props} />;

const dialogTitle = (id: string) => `${id}--title`;
const dialogDescription = (id: string) => `${id}--description`;

export const Dialog: FunctionComponent<
  ComponentProps<"dialog"> & { resetOnClose?: boolean }
> = ({ resetOnClose = true, onClose, ...props }) => {
  const id = useIdentifier(DIALOG_FEATURE);
  const [version, setVersion] = useState(0);

  return (
    <dialog
      key={version}
      {...props}
      id={id}
      popover="auto"
      closedby="any"
      onClose={(e) => {
        if (resetOnClose) setVersion((v) => v + 1);
        onClose?.(e);
      }}
      aria-labelledby={dialogTitle(id)}
      aria-describedby={dialogDescription(id)}
    />
  );
};

export const DialogTitle: FunctionComponent<
  ComponentProps<"h2"> & { asChild?: boolean }
> = ({ asChild, ...props }) => {
  const id = useIdentifier(DIALOG_FEATURE);
  const Comp = asChild ? Slot : "h2";
  return (
    <Comp {...props} id={dialogTitle(id)}>
      {props.children}
    </Comp>
  );
};

export const DialogDescription: FunctionComponent<
  ComponentProps<"p"> & { asChild?: boolean }
> = ({ asChild, ...props }) => {
  const id = useIdentifier(DIALOG_FEATURE);
  const Comp = asChild ? Slot : "p";
  return (
    <Comp {...props} id={dialogDescription(id)}>
      {props.children}
    </Comp>
  );
};

export const ConfirmationDialog: FunctionComponent<
  ComponentProps<typeof Dialog> & { onYes?: () => void; onNo?: () => void }
> = ({ onClose, onYes, onNo, ...props }) => {
  return (
    <Dialog
      {...props}
      onClose={(e) => {
        if (e.currentTarget.returnValue === YES) onYes?.();
        else onNo?.();
        onClose?.(e);
      }}
    />
  );
};
