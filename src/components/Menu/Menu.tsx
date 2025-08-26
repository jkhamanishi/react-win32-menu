import { CSSProperties, ReactNode, useMemo } from "react";
import { cssVar, useMenuStyle } from "../../hooks/useMenuStyle";


interface MenuProps {
  children: ReactNode;
  show: boolean;
  subMenu?: boolean;
}

export function Menu({ children, show, subMenu=false }: MenuProps) {
  const menuStyle = useMenuStyle({
    display: 'grid',
    grid: 'auto / auto 1fr auto',
    position: 'absolute',
    listStyle: 'none',
    zIndex: cssVar('--win32menubar-z-index', 100),
    padding: cssVar('--win32menubar-menu-padding', 0),
    margin: cssVar('--win32menubar-menu-margin', 0),
    background: cssVar('--win32menubar-menu-background', '#EEE'),
    border: cssVar('--win32menubar-menu-border', '1px solid #888'),
    borderRadius: cssVar('--win32menubar-menu-border-radius', 0),
    boxShadow: cssVar('--win32menubar-menu-box-shadow', '2px 2px 2px #555'),
    top: subMenu ? 0 : undefined,
    left: subMenu ? 'calc(100% - 1px)' : undefined,
    minWidth: cssVar('--win32menubar-menu-min-width', '150px'),
  });
  
  const style = useMemo<CSSProperties>(() => ({
    opacity: show ? 1 : 0,
    pointerEvents: show ? 'auto' : 'none',
    ...menuStyle,
  }), [show]);
  
  return (
    <ul tabIndex={-1} role='menu' style={style}>
      {children}
    </ul>
  );
}
