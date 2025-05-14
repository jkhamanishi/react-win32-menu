import { KeyboardEventHandler, MouseEventHandler, ReactNode, RefObject, useRef } from 'react';

import { MenuItemLabel } from '../MenuItemLabel';

import { EventCallback } from '../../hooks/useHotKeyRegistration';
import { useMenuBarContext } from '../../contexts/MenuBarContext';

import { HotKey } from '../../utils/hotKeys';
import useHotKey from '../../hooks/useHotKey';
import useMenuHover from '../../hooks/useMenuHover';


interface MenuItemProps {
  label: string;
  show?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  focusKey?: string;
  menuId?: string;
  checked?: boolean;
  onSelect?: EventCallback;
  keepOpenOnSelect?: boolean;
  hotKey?: HotKey;
}

export function MenuItem({
  onSelect,
  menuId,
  label,
  icon,
  hotKey,
  focusKey,
  // show = true,
  disabled = false,
  checked,
  keepOpenOnSelect = false,
}: MenuItemProps) {
  const menuBar = useMenuBarContext();
  const ref = useRef<HTMLLIElement>(null) as RefObject<HTMLLIElement>;
  
  useMenuHover(ref);
  useHotKey(ref, disabled, focusKey, hotKey, menuId, onSelect);
  
  const selectMenu = (e: MouseEvent | KeyboardEvent) => {
    if (menuBar.disabled) return;
    if (keepOpenOnSelect === false && document.activeElement) {
      (document.activeElement as HTMLElement).blur();
      menuBar.deactivate();
    }
    if (onSelect) {
      onSelect(e);
    } else if (menuId && menuBar.onSelect) {
      menuBar.onSelect(menuId);
    } else {
      console.warn(`No handlers found for menu ${label}`);
    }
  };
  
  const onClick: MouseEventHandler = (e) => {
    if (!disabled) selectMenu(e.nativeEvent);
  };
  const onKeyDown: KeyboardEventHandler = (e) => {
    if (!disabled && e.key === "Enter") selectMenu(e.nativeEvent);
  };
  
  return (
    <li {...{
      ref,
      tabIndex: -1,
      role: 'menuitem',
      'aria-disabled': disabled,
      'aria-label': label,
      onKeyDown,
    }}>
      <MenuItemLabel {...{label, icon, checked, hotKey, onClick}}/>
    </li>
  );
}

