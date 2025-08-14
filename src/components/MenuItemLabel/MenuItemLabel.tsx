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
  isRootMenu=false,
  isSubMenu=false,
  onClick,
}: MenuItemLabelProps) {
  const { checkedIcon, expandIcon } = useMenuBarContext();
  
  const isHovered = (focused && !disabled);
  
  const rootHoveredStyle = useMenuStyle({
    background: cssVar('--win32menubar-root-hover-background', '#DDF'),
    color: cssVar('--win32menubar-root-hover-color', '#000'),
  }, isRootMenu);
  const hoveredStyle = useMenuStyle({
    background: cssVar('--win32menubar-hover-background', '#BBF'),
    color: cssVar('--win32menubar-hover-color', '#000'),
    ...rootHoveredStyle,
  }, isHovered);
  
  const menuItemStyle = useMenuStyle({
    height: cssVar('--win32menubar-label-height', 'auto'),
  }, !isRootMenu);
  
  const baseContainerStyle = useMenuStyle({
    display: 'grid',
    gridColumn: 'span 3',
    gridTemplateColumns: 'subgrid',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    position: 'relative',
    cursor: disabled ? 'default' : 'pointer',
    padding: cssVar('--win32menubar-label-padding', '4px 6px'),
    textAlign: cssVar('--win32menubar-label-text-align', 'left'),
    gap: cssVar('--win32menubar-label-icon-gap', '4px'),
    height: cssVar('--win32menubar-root-label-height', 'auto'),
    ...menuItemStyle,
  });
  
  const containerStyle = useMenuStyle({
    ...baseContainerStyle,
    ...hoveredStyle,
  }, [isHovered]);
  
  const rootIconStyle = useMenuStyle({
    height: cssVar('--win32menubar-root-icon-size', '12px'),
    width: cssVar('--win32menubar-root-icon-size', '12px'),
  }, isRootMenu);
  const iconStyle = useMenuStyle({
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
    height: cssVar('--win32menubar-label-icon-size', '16px'),
    width: cssVar('--win32menubar-label-icon-size', '16px'),
    ...rootIconStyle,
  });
  
  const labelStyle = useMenuStyle({
    width: 'max-content',
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
