import { CSSProperties, ReactNode, RefObject, useMemo, useRef } from 'react';
import { MenuBarConfig, MenuBarContextProvider } from '../../contexts/MenuBarContext';
import { cssVar, CustomStyleVars, useMenuStyle } from '../../hooks/useMenuStyle';


export type Win32MenuStyleProps = CustomStyleVars & CSSProperties;

export interface Win32MenuBarProps extends Partial<MenuBarConfig> {
  className?: string;
  style?: Win32MenuStyleProps;
  children: ReactNode;
}

/** The main menu bar component. Wraps this component around all root menus. */
export function Win32MenuBar({
  onSelect, 
  expandIcon = "❯", 
  checkedIcon = "✔", 
  hotKeysEnabled = true, 
  disabled = false,
  className, 
  style: customStyle,
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
  
  const style = useMenuStyle({
    display: 'flex',
    listStyle: 'none',
    userSelect: 'none',
    width: 'min-content',
    padding: cssVar('--win32menubar-padding', 0),
    margin: cssVar('--win32menubar-margin', 0),
    outline: cssVar('--win32menubar-outline', 'none'),
    background: cssVar('--win32menubar-background', 'inherit'),
    color: cssVar('--win32menubar-color', 'inherit'),
    fontFamily: cssVar('--win32menubar-font-family', 'inherit'),
    fontSize: cssVar('--win32menubar-font-size', 'inherit'),
    ...customStyle,
  });
  
  return (
    <ul {...{ref, className, style, tabIndex: 0}}>
      <MenuBarContextProvider {...{config, containerRef: ref}}>
        {children}
      </MenuBarContextProvider>
    </ul>
  );
};