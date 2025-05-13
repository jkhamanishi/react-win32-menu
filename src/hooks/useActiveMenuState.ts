import { RefObject } from "react";
import { useBoolean, useEventListener, useOnClickOutside } from "usehooks-ts";

export interface ActiveMenuState {
  active: boolean;
  activate: () => void;
  deactivate: () => void;
}

export default function useActiveMenuState(ref: RefObject<HTMLElement>): ActiveMenuState {
  const { value, setTrue, setFalse } = useBoolean(false)
  
  useEventListener('blur', setFalse);
  useOnClickOutside(ref, setFalse);
  
  return {
    active: value,
    activate: setTrue,
    deactivate: setFalse,
  };
}
