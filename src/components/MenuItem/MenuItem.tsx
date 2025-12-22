import { KeyboardEventHandler, MouseEventHandler, ReactNode, RefObject, useRef } from 'react';

import { MenuItemLabel } from '../MenuItemLabel';

import { EventCallback } from '../../contexts/HotKeyContext';
import { useMenuBarContext } from '../../contexts/MenuBarContext';

import { HotKey } from '../../utils/hotKeys';
import useHotKey from '../../hooks/useHotKey';
import useMenuHover from '../../hooks/useMenuHover';
import useFocusWithin from '../../hooks/useFocusWithin';
import useMenuStyle from '../../hooks/useMenuStyle';
import useAccessKey from '../../hooks/useAccessKey';


export interface MenuItemProps {
  label: string;
  show?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  accessKey?: string;
  menuId?: string;
  checked?: boolean;
  onSelect?: EventCallback;
  keepOpenOnSelect?: boolean;
  hotKey?: HotKey;
  isRootItem?: boolean;
}

export function MenuItem({
  onSelect,
  menuId,
  label,
  icon,
  hotKey,
  accessKey,
  show = true,
  disabled = false,
  checked,
  keepOpenOnSelect = false,
  isRootItem: isRootMenu = false,
}: MenuItemProps) {
  const menuBar = useMenuBarContext();
  const ref = useRef<HTMLLIElement>(null) as RefObject<HTMLLIElement>;
  
  useMenuHover(ref);
  useHotKey(disabled, hotKey, menuId, onSelect);
  const focused = useFocusWithin(ref);
  
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
  
  useAccessKey(ref, accessKey, onSelect);
  
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
      onKeyDown,
    }}>
      <MenuItemLabel {...{focused, label, icon, checked, hotKey, accessKey, onClick, isRootMenu}} />
    </li>
  );
}

