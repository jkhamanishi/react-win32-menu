import { MouseEventHandler, ReactNode, RefObject, useCallback, useEffect, useRef } from 'react';

import { Menu } from '../Menu';
import { MenuItemLabel } from '../MenuItemLabel';
import { useMenuBarContext } from '../../contexts/MenuBarContext';

import useHotKey from '../../hooks/useHotKey';
import useMenuHover from '../../hooks/useMenuHover';
import useFocusWithin from '../../hooks/useFocusWithin';
import useMenuStyle from '../../hooks/useMenuStyle';
import { useDebounceValue, useHover } from 'usehooks-ts';


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
  const focusedWithin = useFocusWithin(ref);
  const hovered = useHover(ref);
  const showMenu = (focusedWithin && menuBar.active);
  const focused = (hovered || showMenu);
  
  const [showMenuDebounced, setDebouncedShowMenu] = useDebounceValue(showMenu, 500);
  
  useEffect(() => {
    setDebouncedShowMenu(showMenu);
  }, [showMenu]);
  
  const onClick: MouseEventHandler = useCallback(() => {
    if (showMenuDebounced) {
      (document.activeElement as HTMLElement)?.blur();
      menuBar.deactivate();
    } else {
      menuBar.activate();
    }
  }, [showMenuDebounced]);
  
  const style = useMenuStyle({
    display: show ? 'block' : 'none',
    position: 'relative',
    outline: 'none',
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


