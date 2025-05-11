import { createElement, ReactNode } from "react";
import createContext from "./createContext";


interface IMenuContext {
  isOpen: boolean;
  isRoot: boolean;
}

const [ContextProvider, useContext] = createContext<IMenuContext>("MenuContext");

export function MenuContextProvider({isOpen, isRoot=false, children}: {isOpen: boolean; isRoot?: boolean, children: ReactNode}) {
  
  const value: IMenuContext = {
    isOpen,
    isRoot,
  };
  
  return createElement(ContextProvider, {value}, children);
}

export function useMenuContext() {
  return useContext();
}
