import { createElement, ReactNode, useEffect, useState } from "react";
import { useBoolean, useEventListener } from "usehooks-ts";

import createContext from "./createContext";

import { useMenuBarContext } from "./MenuBarContext";



interface AccessKeysContextType {
  active: boolean;
  activate: () => void;
  deactivate: () => void;
}

const [ContextProvider, useContext] = createContext<AccessKeysContextType>("AccessKeysContext");

export function AccessKeysContextProvider({children}: {children: ReactNode}) {
  const menubar = useMenuBarContext();
  const [altDown, setAltDown] = useState(false);
  const { value: active, setTrue, setFalse } = useBoolean(false);
  
  const activate = menubar.hotKeysEnabled ? setTrue : (()=>{});
  const deactivate = setFalse;
  
  useEffect(() => {
    if (!menubar.active) setFalse();
  }, [menubar.active]);
  
  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Alt" && !altDown) {
      const toggle = !active ? activate : deactivate;
      toggle();
      setAltDown(true);
      e.preventDefault();
    } else if (e.key === "Escape" && active) {
      deactivate();
      e.preventDefault();
    }
  });
  
  useEventListener("keyup", (e: KeyboardEvent) => {
    if (e.key === "Alt") setAltDown(false);
  });
  
  const value: AccessKeysContextType = {
    active,
    activate,
    deactivate,
  };
  
  return createElement(ContextProvider, {value}, children);
}

export function useAccessKeysContext() {
  return useContext();
}
