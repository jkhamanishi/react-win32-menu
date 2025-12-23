import { createElement, ReactNode } from "react";
import createContext from "./createContext";


export interface MenuBarConfig {
  onSelect?: (menuId: string) => void;
  expandIcon: string | ReactNode;
  checkedIcon: string | ReactNode;
  hotKeysEnabled: boolean;
  disabled: boolean;
  keepActive: boolean;
}

export const defaultConfig: MenuBarConfig = {
  expandIcon: "❯",
  checkedIcon: "✓",
  hotKeysEnabled: true,
  disabled: false,
  keepActive: false,
};

const [ContextProvider, useContext] = createContext<MenuBarConfig>("ConfigContext");

export function createConfigContextProvider(config: MenuBarConfig) {
  
  return ({children}: {children: ReactNode}) => {
    return createElement(ContextProvider, { value: config }, children);
  };
}

export function useMenuBarConfig() {
  return useContext();
}
