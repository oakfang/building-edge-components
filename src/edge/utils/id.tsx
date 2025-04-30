import { Root as Slot } from "@radix-ui/react-slot";
import {
  type ComponentProps,
  type FunctionComponent,
  type PropsWithChildren,
  createContext,
  use,
  useId,
  useMemo,
} from "react";

const DEFAULT_FEATURE = Symbol("DEFAULT_FEATURE");

const IdentifierContext = createContext(new Map<string | symbol, string>());

export const useIdentifier = (feature: string | symbol = DEFAULT_FEATURE) => {
  const ids = use(IdentifierContext);
  const id = ids.get(feature);
  if (!id) throw new Error("Please use inside a proper IdentifierContext");
  return id;
};

export const IdentifierProvider: FunctionComponent<
  PropsWithChildren<{ feature?: string | symbol }>
> = ({ children, feature = DEFAULT_FEATURE }) => {
  const autoId = useId();
  const ids = use(IdentifierContext);
  const wrapped = useMemo(() => {
    const copy = new Map(ids);
    copy.set(feature, autoId);
    return copy;
  }, [ids, autoId, feature]);
  return <IdentifierContext value={wrapped}>{children}</IdentifierContext>;
};

export function identifierFor(feature: string | symbol) {
  const Inner: FunctionComponent<
    Omit<ComponentProps<typeof IdentifierProvider>, "feature">
  > = (props) => <IdentifierProvider feature={feature} {...props} />;
  return Inner;
}

export const Identified: FunctionComponent<
  PropsWithChildren<{ prop?: string; feature?: string | symbol }>
> = ({ prop = "id", feature = DEFAULT_FEATURE, children }) => {
  const id = useIdentifier(feature);
  return <Slot {...{ [prop]: id }}>{children}</Slot>;
};
