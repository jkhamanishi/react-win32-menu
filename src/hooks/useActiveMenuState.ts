import { RefObject } from "react";
import { useBoolean, useEventListener, useOnClickOutside } from "usehooks-ts";

export interface ActiveMenuState {
  active: boolean;
  activate: () => void;
  deactivate: () => void;
}

export default function useActiveMenuState(ref: RefObject<HTMLElement>, keepActive: boolean): ActiveMenuState {
  const { value, setTrue, setFalse } = useBoolean(keepActive);
  
  const active = value;
  const activate = setTrue;
  const deactivate = !keepActive ? setFalse : (()=>{});
  
  useEventListener('blur', deactivate);
  useOnClickOutside(ref, deactivate);
  
  return { active, activate, deactivate };
}
