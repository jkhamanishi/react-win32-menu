import { createElement, ReactNode, RefObject, useMemo } from 'react';
import createContext from './createContext';

import useActiveMenuState, { ActiveMenuState } from '../hooks/useActiveMenuState';
import useHotKeyRegistration, { HotKeyRegistration } from '../hooks/useHotKeyRegistration';
import useKeyboardNavigation from '../hooks/useKeyboardNavigation';


export interface MenuBarConfig {
  onSelect?: (menuId: string) => void
  expandIcon: string | ReactNode;
  checkedIcon: string | ReactNode;
  hotKeysEnabled: boolean;
  disabled: boolean;
  keepActive: boolean;
}

interface IMenuBarContext extends MenuBarConfig, ActiveMenuState, HotKeyRegistration {};

const [ContextProvider, useContext] = createContext<IMenuBarContext>("MenuBarContext");


interface MenuBarContextProviderProps {
  containerRef: RefObject<HTMLElement>;
  config: MenuBarConfig;
  children: ReactNode
}

export function MenuBarContextProvider({containerRef, config, children}: MenuBarContextProviderProps) {
  const activeState = useActiveMenuState(containerRef, config.keepActive);
  
  const enableHotKeys = (config.hotKeysEnabled && !config.disabled);
  const hotkeys = useHotKeyRegistration(enableHotKeys);
  
  useKeyboardNavigation(containerRef, config.disabled);
  
  const value = useMemo<IMenuBarContext>(() => ({
    ...activeState,
    ...hotkeys,
    ...config,
  }), [activeState, hotkeys, config]);
  
  return createElement(ContextProvider, { value }, children);
}

export function useMenuBarContext() {
  return useContext();
}
