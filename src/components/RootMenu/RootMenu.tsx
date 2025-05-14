import { MouseEventHandler, ReactNode, RefObject, useRef } from 'react';

import { MenuItemLabel } from '../MenuItemLabel';
import { useMenuBarContext } from '../../contexts/MenuBarContext';

import useHotKey from '../../hooks/useHotKey';
import useMenuHover from '../../hooks/useMenuHover';


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
  // show = true,
  disabled = false,
  children,
}: RootMenuProps) {
  const menuBar = useMenuBarContext();
  const ref = useRef<HTMLLIElement>(null) as RefObject<HTMLLIElement>;
  
  useMenuHover(ref, children);
  useHotKey(ref, disabled, focusKey);
  
  const onClick: MouseEventHandler = () => {
    if (menuBar.active) {
      (document.activeElement as HTMLElement)?.blur();
      menuBar.deactivate();
    } else {
      menuBar.activate();
    }
  };
  
  return (
    <li {...{
      ref,
      tabIndex: 0,
      role: 'menuitem',
      'aria-disabled': disabled,
      'aria-label': label,
    }}>
      <MenuItemLabel isRootMenu {...{label, focusKey, icon, onClick}} />
      {children && !disabled && (
        <ul tabIndex={-1} role='menu'>{children}</ul>
      )}
    </li>
  );
}


