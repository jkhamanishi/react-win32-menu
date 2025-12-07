import { ReactNode, RefObject } from 'react';
import aggregateComponents from './aggregateComponents';

import { ConfigContextProvider, MenuBarConfig, useMenuBarConfig } from './ConfigContext';
import { ActiveStateContextProvider, useActiveStateContext } from './ActiveStateContext';
import { HotKeyContextProvider } from './HotKeyContext';
import useKeyboardNavigation from '../hooks/useKeyboardNavigation';


interface MenuBarContextProviderProps {
  containerRef: RefObject<HTMLUListElement>;
  config: MenuBarConfig;
  children: ReactNode
}

function MenuBarContextProvider({containerRef, config, children}: MenuBarContextProviderProps) {
  
  useKeyboardNavigation(containerRef, config.disabled);
  
  return aggregateComponents([
    ConfigContextProvider(config),
    ActiveStateContextProvider(containerRef),
    HotKeyContextProvider,
    children,
  ]);
}

function useMenuBarContext() {
  const config = useMenuBarConfig();
  const activeState = useActiveStateContext();
  
  return { ...config, ...activeState };
}

export {
  MenuBarContextProvider,
  useMenuBarContext,
  type MenuBarConfig,
}
