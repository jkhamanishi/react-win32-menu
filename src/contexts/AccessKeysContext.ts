import { createElement, ReactNode } from "react";
import createContext from "./createContext";
import { useBoolean } from "usehooks-ts";



interface AccessKeysContextType {
  active: boolean;
  activate: () => void;
  deactivate: () => void;
}

const [ContextProvider, useContext] = createContext<AccessKeysContextType>("AccessKeysContext");

export function AccessKeysContextProvider({children}: {children: ReactNode}) {
  const { value: active, setTrue, setFalse } = useBoolean(false);
  
  const value: AccessKeysContextType = {
    active,
    activate: setTrue,
    deactivate: setFalse,
  };
  
  return createElement(ContextProvider, {value}, children);
}

export function useAccessKeysContext() {
  return useContext();
}
