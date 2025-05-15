import { MouseEventHandler, ReactNode } from "react";
import { useMenuBarContext } from "../../contexts/MenuBarContext";
import { HotKeyHint, HotKeyHintProps } from "../HotKeyHint";
import { cssVar, useMenuStyle } from "../../hooks/useMenuStyle";


export interface MenuItemLabelProps extends HotKeyHintProps {
  label: string;
  focused: boolean;
  disabled?: boolean;
  focusKey?: string;
  icon?: ReactNode;
  checked?: boolean;
  isRootMenu?: boolean;
  isSubMenu?: boolean;
  onClick?: MouseEventHandler;
}

export function MenuItemLabel({
  label,
  focused,
  disabled=false,
  focusKey,
  icon,
  checked,
  hotKey,
  isRootMenu,
  isSubMenu,
  onClick,
}: MenuItemLabelProps) {
  const { checkedIcon, expandIcon } = useMenuBarContext();
  
  const menuItemStyle = useMenuStyle({
    minWidth: cssVar('--win32menubar-label-min-width', '150px'),
    height: cssVar('--win32menubar-label-height', 'auto'),
  });
  const hoveredStyle = useMenuStyle({
    background: cssVar('--win32menubar-hover-background', '#888'),
    color: cssVar('--win32menubar-hover-color', '#FFF'),
  })
  const containerStyle = useMenuStyle({
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    position: 'relative',
    cursor: disabled ? 'default' : 'pointer',
    padding: cssVar('--win32menubar-label-padding', '4px 6px'),
    textAlign: cssVar('--win32menubar-label-text-align', 'left'),
    gap: cssVar('--win32menubar-label-icon-gap', '4px'),
    height: cssVar('--win32menubar-root-label-height', 'auto'),
    ...(!isRootMenu ? menuItemStyle : {}),
    ...((focused && !disabled) ? hoveredStyle : {}),
  }, [disabled, focused]);
  const rootIconStyle = useMenuStyle({
    height: cssVar('--win32menubar-root-icon-size', '12px'),
    width: cssVar('--win32menubar-root-icon-size', '12px'),
  });
  const iconStyle = useMenuStyle({
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
    height: cssVar('--win32menubar-label-icon-size', '16px'),
    width: cssVar('--win32menubar-label-icon-size', '16px'),
    ...(isRootMenu ? rootIconStyle : {}),
  });
  const labelStyle = useMenuStyle({
    flexGrow: 1,
  });
  
  return (
    <div style={containerStyle} onClick={onClick}>
      {(icon || !isRootMenu) && (
        <span style={iconStyle}>
          {checked ? checkedIcon : icon}
        </span>
      )}
      {focusKey && label.includes(focusKey) ? (
        <span style={labelStyle}>
          {label.substring(0, label.indexOf(focusKey))}
          <u>{focusKey}</u>
          {label.substring(label.indexOf(focusKey) + 1)}
        </span>
      ) : (
        <span style={labelStyle}>
          {label}
        </span>
      )}
      <HotKeyHint hotKey={hotKey} />
      {isSubMenu && (
        <span style={iconStyle}>
          {expandIcon}
        </span>
      )}
    </div>
  );
}
