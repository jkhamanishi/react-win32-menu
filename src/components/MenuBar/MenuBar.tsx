import { ReactNode, RefObject, useMemo, useRef } from 'react';
import { MenuBarConfig, MenuBarContextProvider } from '../../contexts/MenuBarContext';


export interface Win32MenuBarProps extends Partial<MenuBarConfig> {
  className?: string;
  children: ReactNode;
}

/** The main menu bar component. Wraps this component around all root menus. */
export function Win32MenuBar({
  onSelect, 
  expandIcon = "⮞", 
  checkedIcon = "✔", 
  hotKeysEnabled = true, 
  disabled = false,
  className, 
  children,
}: Win32MenuBarProps) {
  const ref = useRef<HTMLUListElement>(null) as RefObject<HTMLUListElement>;
  
  const config: MenuBarConfig = useMemo(() => ({
    onSelect,
    expandIcon,
    checkedIcon,
    hotKeysEnabled,
    disabled,
  }), [onSelect, expandIcon, checkedIcon, hotKeysEnabled, disabled]);
  
  return (
    <ul {...{ref, className, tabIndex: 0}}>
      <MenuBarContextProvider {...{config, containerRef: ref}}>
        {children}
      </MenuBarContextProvider>
    </ul>
  );
};