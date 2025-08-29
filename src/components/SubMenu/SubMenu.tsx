import { ReactNode, RefObject, useRef } from 'react';

import { Menu } from '../Menu';
import { MenuItemLabel } from '../MenuItemLabel';

import useHotKey from '../../hooks/useHotKey';
import useMenuHover from '../../hooks/useMenuHover';
import useFocusWithin from '../../hooks/useFocusWithin';
import useMenuStyle from '../../hooks/useMenuStyle';
import { useHover } from 'usehooks-ts';
import useFocused from '../../hooks/useFocused';


export interface SubMenuProps {
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
  show = true,
  disabled = false,
  children,
}: SubMenuProps) {
  const ref = useRef<HTMLLIElement>(null) as RefObject<HTMLLIElement>;
  
  useMenuHover(ref, children);
  useHotKey(ref, disabled, focusKey);
  const focused = useFocused(ref);
  const focusedWithin = useFocusWithin(ref);
  const hovered = useHover(ref);
  const childrenFocused = focusedWithin && !focused;
  const showMenu = hovered || childrenFocused;
  
  const style = useMenuStyle({
    display: show ? 'grid' : 'none',
    gridColumn: 'span 3',
    gridTemplateColumns: 'subgrid',
    position: 'relative',
    outline: 'none',
  }, [show]);
  
  return (
    <li {...{
      ref,
      style,
      tabIndex: -1,
      role: 'menuitem',
      'aria-disabled': disabled,
      'aria-label': label,
    }}>
      <MenuItemLabel isSubMenu {...{focused: focusedWithin, label, icon}} />
      {!disabled && (
        <Menu subMenu show={showMenu}>
          {children}
        </Menu>
      )}
    </li>
  );
}

