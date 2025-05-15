import { MouseEventHandler, ReactNode, RefObject, useRef } from 'react';

import { Menu } from '../Menu';
import { MenuItemLabel } from '../MenuItemLabel';
import { useMenuBarContext } from '../../contexts/MenuBarContext';

import useHotKey from '../../hooks/useHotKey';
import useMenuHover from '../../hooks/useMenuHover';
import useFocusWithin from '../../hooks/useFocusWithin';
import useMenuStyle, { cssVar } from '../../hooks/useMenuStyle';
import { useHover } from 'usehooks-ts';


interface RootMenuProps {
  label: string;
  show?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  focusKey?: string;
  children?: ReactNode;
}

export function RootMenu({
  label,
  icon,
  focusKey,
  show = true,
  disabled = false,
  children,
}: RootMenuProps) {
  const menuBar = useMenuBarContext();
  const ref = useRef<HTMLLIElement>(null) as RefObject<HTMLLIElement>;
  
  useMenuHover(ref, children);
  useHotKey(ref, disabled, focusKey);
  const showMenu = useFocusWithin(ref);
  const hovered = useHover(ref);
  const focused = (showMenu || hovered);
  
  const onClick: MouseEventHandler = () => {
    if (menuBar.active) {
      (document.activeElement as HTMLElement)?.blur();
      menuBar.deactivate();
    } else {
      menuBar.activate();
    }
  };
  
  const style = useMenuStyle({
    display: show ? 'block' : 'none',
    position: 'relative',
    outline: cssVar('--win32menubar-menu-outline', 'none'),
  }, [show]);
  
  return (
    <li {...{
      ref,
      style,
      tabIndex: 0,
      role: 'menuitem',
      'aria-disabled': disabled,
      'aria-label': label,
    }}>
      <MenuItemLabel isRootMenu {...{focused, label, focusKey, icon, onClick}} />
      {children && !disabled && (
        <Menu show={showMenu}>
          {children}
        </Menu>
      )}
    </li>
  );
}


