import { ReactNode, RefObject } from 'react';
import aggregateComponents from './aggregateComponents';

import { createConfigContextProvider, defaultConfig, MenuBarConfig, useMenuBarConfig } from './ConfigContext';
import { createActiveStateContextProvider, useActiveStateContext } from './ActiveStateContext';
import { HotKeyContextProvider } from './HotKeyContext';
import { AccessKeysContextProvider } from './AccessKeysContext';
import useKeyboardNavigation from '../hooks/useKeyboardNavigation';


interface MenuBarContextProviderProps {
  containerRef: RefObject<HTMLUListElement>;
  config: MenuBarConfig;
  children: ReactNode
}

function MenuBarContextProvider({containerRef, config, children}: MenuBarContextProviderProps) {
  
  useKeyboardNavigation(containerRef, config.disabled);
  
  const ConfigContextProvider = createConfigContextProvider(config);
  const ActiveStateContextProvider = createActiveStateContextProvider(containerRef);
  
  return aggregateComponents([
    ConfigContextProvider,
    ActiveStateContextProvider,
    HotKeyContextProvider,
    AccessKeysContextProvider,
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
  defaultConfig,
}
