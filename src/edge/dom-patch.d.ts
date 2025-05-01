import "react";

type ValidCommand =
  | "show-popover"
  | "hide-popover"
  | "toggle-popover"
  | "show-modal"
  | "close"
  | `--${string}`;

declare module "react" {
  interface HTMLAttributes<T> {
    popover?: "auto" | "manual" | "hint" | "";
  }
  interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
    closedby?: "any" | "closerrequest" | "none";
  }
  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    commandfor?: string;
    command?: ValidCommand;
  }
}

declare global {
  interface HTMLElement {
    showPopover(options?: { source: HTMLElement }): void;
    popover?: "auto" | "manual" | "hint" | "";
  }

  interface HTMLButtonElement extends HTMLElement {
    commandForElement?: HTMLElement;
  }

  interface CommandEvent extends Event {
    type: "command";
    command: ValidCommand;
    source: HTMLButtonElement;
    target: HTMLElement;
  }

  interface GlobalEventHandlersEventMap {
    command: CommandEvent;
  }
}
