import { ReactNode, RefObject, useRef } from 'react';

import { MenuItemLabel } from '../MenuItemLabel';

import useHotKey from '../../hooks/useHotKey';
import useMenuHover from '../../hooks/useMenuHover';


interface SubMenuProps {
  label: string;
  show?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  focusKey?: string;
  children: ReactNode;
}

export function SubMenu({
  label,
  icon,
  focusKey,
  // show = true,
  disabled = false,
  children,
}: SubMenuProps) {
  const ref = useRef<HTMLLIElement>(null) as RefObject<HTMLLIElement>;
  
  useMenuHover(ref, children);
  useHotKey(ref, disabled, focusKey);
  
  return (
    <li {...{
      ref,
      tabIndex: -1,
      role: 'menuitem',
      'aria-disabled': disabled,
      'aria-label': label,
    }}>
      <MenuItemLabel isSubMenu {...{label, icon}}/>
      {!disabled && (
        <ul tabIndex={-1} role='menu'>{children}</ul>
      )}
    </li>
  );
}

