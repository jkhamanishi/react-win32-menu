import { CSSProperties, ReactNode, RefObject, useMemo, useRef } from 'react';
import { MenuBarConfig, MenuBarContextProvider } from '../../contexts/MenuBarContext';
import { cssVar, CustomStyleVars, useMenuStyle } from '../../hooks/useMenuStyle';
import { CustomStyleProps, stylePropsToVars } from '../../utils/menuStyle';


export type Win32MenuStyleProps = CustomStyleProps;
export type Win32MenuCSSVars = CustomStyleVars;
export type Win32MenuStyleOverrideProps = CustomStyleVars & CSSProperties;

export interface Win32MenuBarProps extends Partial<MenuBarConfig> {
  className?: string;
  style?: Win32MenuStyleProps;
  styleOverride?: Win32MenuStyleOverrideProps;
  children: ReactNode;
}

/**
 * The main menu bar component. Wrap this component around all root menus.
 */
export function Win32MenuBar({
  onSelect, 
  expandIcon = "❯", 
  checkedIcon = "✔", 
  hotKeysEnabled = true, 
  disabled = false,
  className, 
  style: styleProps,
  styleOverride: styleOverride,
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
    fontFamily: cssVar('--win32menubar-font-family', 'sans-serif'),
    fontSize: cssVar('--win32menubar-font-size', 'inherit'),
    ...stylePropsToVars(styleProps ?? {}),
    ...styleOverride,
  }, [styleProps]);
  
  return (
    <ul {...{ref, className, style, role: 'menubar', tabIndex: 0}}>
      <MenuBarContextProvider {...{config, containerRef: ref}}>
        {children}
      </MenuBarContextProvider>
    </ul>
  );
};