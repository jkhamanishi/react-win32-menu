import { ReactNode, RefObject, useRef } from 'react';

import { Menu } from '../Menu';
import { MenuItemLabel } from '../MenuItemLabel';

import useHotKey from '../../hooks/useHotKey';
import useMenuHover from '../../hooks/useMenuHover';
import useFocusWithin from '../../hooks/useFocusWithin';
import useMenuStyle, { cssVar } from '../../hooks/useMenuStyle';


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
  show = true,
  disabled = false,
  children,
}: SubMenuProps) {
  const ref = useRef<HTMLLIElement>(null) as RefObject<HTMLLIElement>;
  
  useMenuHover(ref, children);
  useHotKey(ref, disabled, focusKey);
  const focused = useFocusWithin(ref);
  
  const style = useMenuStyle({
    display: show ? 'block' : 'none',
    position: 'relative',
    outline: cssVar('--win32menubar-menuitem-outline', 'none'),
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
      <MenuItemLabel isSubMenu {...{focused, label, icon}} />
      {!disabled && (
        <Menu subMenu show={focused}>
          {children}
        </Menu>
      )}
    </li>
  );
}

