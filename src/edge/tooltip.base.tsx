import { Root as Slot } from "@radix-ui/react-slot";
import {
  type ComponentProps,
  type FunctionComponent,
  type HTMLAttributes,
  type PropsWithChildren,
  createContext,
  use,
  useMemo,
} from "react";
import { identifierFor, IdentifierProvider, useIdentifier } from "./utils";

const INACTIVE = -1;

class TooltipTrigger {
  #timeout: number;
  #resetTimeout: number;

  #isActive = false;
  #tid = INACTIVE;
  #rtid = INACTIVE;
  constructor(timeout = 0, resetTimeout = 0) {
    this.#timeout = timeout;
    this.#resetTimeout = resetTimeout;
  }

  ping() {
    if (this.#rtid !== INACTIVE) {
      clearTimeout(this.#rtid);
      this.#rtid = INACTIVE;
    }
  }

  trigger(onActive: () => void) {
    if (this.#isActive) return onActive();
    this.ping();
    this.#tid = window.setTimeout(() => {
      this.#isActive = true;
      this.#tid = INACTIVE;
      onActive();
    }, this.#timeout);
  }

  release() {
    if (!this.#isActive) {
      clearTimeout(this.#tid);
      this.#tid = INACTIVE;
      return;
    }
    this.#rtid = window.setTimeout(() => {
      this.#isActive = false;
      this.#rtid = INACTIVE;
    }, this.#resetTimeout);
  }
}

const SharedTooltipTimerContext = createContext(new TooltipTrigger(0, 0));

export const Timer: FunctionComponent<
  PropsWithChildren<{ timeout?: number; resetTimeout?: number }>
> = ({ children, timeout, resetTimeout }) => {
  const timer = useMemo(
    () => new TooltipTrigger(timeout, resetTimeout),
    [timeout, resetTimeout]
  );
  return (
    <SharedTooltipTimerContext value={timer}>
      {children}
    </SharedTooltipTimerContext>
  );
};

const TOOLTIP_FEATURE = Symbol("tooltip");

export const Root = identifierFor(TOOLTIP_FEATURE);

export const TimedRoot: FunctionComponent<ComponentProps<typeof Timer>> = (
  props
) => (
  <Root>
    <Timer {...props} />
  </Root>
);

type Cause = "focus" | "hover";

const CAUSES = new WeakMap<HTMLElement, Cause>();

export const Trigger: FunctionComponent<
  ComponentProps<"button"> & { asChild?: boolean }
> = ({ asChild, ...props }) => {
  const timer = use(SharedTooltipTimerContext);
  const tooltipId = useIdentifier(TOOLTIP_FEATURE);
  const Comp = asChild ? Slot : "button";
  const getTooltip = () => document.getElementById(tooltipId);
  const showTooltip = (self: HTMLButtonElement, cause: Cause) => {
    const tooltip = getTooltip();
    if (!tooltip) return;
    if (CAUSES.has(tooltip)) return;
    CAUSES.set(tooltip, cause);
    tooltip.showPopover({ source: self });
  };
  const hideTooltip = (cause: Cause) => {
    const tooltip = getTooltip();
    if (!tooltip) return;
    if (CAUSES.get(tooltip) !== cause) return;
    tooltip.hidePopover();
    CAUSES.delete(tooltip);
  };

  return (
    <Comp
      aria-describedby={tooltipId}
      onFocus={(e) => showTooltip(e.currentTarget, "focus")}
      onBlur={() => hideTooltip("focus")}
      onMouseOver={(e) => {
        const tooltip = e.currentTarget;
        timer.trigger(() => showTooltip(tooltip, "hover"));
      }}
      onMouseLeave={(e) => {
        if (e.relatedTarget === getTooltip()) return;
        timer.release();
        hideTooltip("hover");
      }}
      {...props}
    />
  );
};

export const Tooltip: FunctionComponent<
  ComponentProps<"span"> & { asChild?: boolean }
> = ({ asChild, ...props }) => {
  const timer = use(SharedTooltipTimerContext);
  const tooltipId = useIdentifier(TOOLTIP_FEATURE);
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      id={tooltipId}
      role="tooltip"
      popover={"hint" as HTMLAttributes<unknown>["popover"]}
      onMouseEnter={() => timer.ping()}
      onMouseLeave={(e) => {
        const tooltip = e.currentTarget as HTMLElement;
        if (CAUSES.get(tooltip) === "hover") {
          timer.release();
          CAUSES.delete(tooltip);
          tooltip.hidePopover();
        }
      }}
      {...props}
    />
  );
};
