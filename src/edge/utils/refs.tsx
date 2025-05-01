import type { Ref, RefCallback } from "react";

export function composeRef<T>(ref: Ref<T>, callback: RefCallback<T>) {
  return (node: T | null) => {
    let cleanup: ReturnType<RefCallback<unknown>>;
    if (ref) {
      if (typeof ref === "function") {
        cleanup = ref(node);
      } else {
        ref.current = node;
      }
    }
    const composedCleanup = callback(node);
    return () => {
      cleanup?.();
      composedCleanup?.();
    };
  };
}
