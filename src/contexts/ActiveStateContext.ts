import { createElement, ReactNode, RefObject } from "react";
import { useBoolean, useEventListener, useOnClickOutside } from "usehooks-ts";
import { useMenuBarConfig } from "./ConfigContext";
import createContext from "./createContext";


export interface ActiveMenuState {
  active: boolean;
  activate: () => void;
  deactivate: () => void;
}

const [ContextProvider, useContext] = createContext<ActiveMenuState>("ActiveStateContext");

export function ActiveStateContextProvider(containerRef: RefObject<HTMLUListElement>) {
  return ({children}: {children: ReactNode}) => {
    
    const { keepActive } = useMenuBarConfig();
    const { value: active, setTrue, setFalse } = useBoolean(keepActive);
    
    const activate = setTrue;
    const deactivate = !keepActive ? setFalse : (()=>{});
    
    useEventListener('blur', deactivate);
    useOnClickOutside(containerRef, deactivate);
    
    const value: ActiveMenuState = {
      active, activate, deactivate,
    };
    
    return createElement(ContextProvider, { value }, children);
  }
}

export function useActiveStateContext() {
  return useContext();
}
