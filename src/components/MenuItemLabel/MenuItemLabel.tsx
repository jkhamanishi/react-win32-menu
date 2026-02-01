import { MouseEventHandler, ReactNode } from "react";
import { useMenuBarContext } from "../../contexts/MenuBarContext";
import { HotKeyHint, HotKeyHintProps } from "../HotKeyHint";
import { cssVar, useMenuStyle } from "../../hooks/useMenuStyle";
import { AccessKeyHint } from "../AccessKeyHint";


export interface MenuItemLabelProps extends HotKeyHintProps {
  label: string;
  focused: boolean;
  disabled?: boolean;
  accessKey?: string;
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
  accessKey,
  icon,
  checked=false,
  hotKey,
  isRootMenu=false,
  isSubMenu=false,
  onClick,
}: MenuItemLabelProps) {
  const { checkedIcon, expandIcon } = useMenuBarContext();
  
  const isHovered = (focused && !disabled);
  
  const disabledStyle = useMenuStyle({
    color: cssVar('--win32menubar-label-disabled-color', '#888'),
    cursor: 'default',
  }, disabled);
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
    cursor: 'pointer',
    padding: cssVar('--win32menubar-label-padding', '4px 4px'),
    textAlign: cssVar('--win32menubar-label-text-align', 'left'),
    gap: cssVar('--win32menubar-label-icon-gap', '4px'),
    height: cssVar('--win32menubar-root-label-height', 'auto'),
    ...menuItemStyle,
  });
  
  const containerStyle = useMenuStyle({
    ...baseContainerStyle,
    ...hoveredStyle,
    ...disabledStyle,
  }, [isHovered, disabled]);
  
  const rootIconStyle = useMenuStyle({
    height: cssVar('--win32menubar-root-icon-size', '12px'),
    width: cssVar('--win32menubar-root-icon-size', '12px'),
  }, isRootMenu);
  const checkMarkStyle = useMenuStyle({
    background: cssVar('--win32menubar-checked-background-color', '#BBF'),
  }, checked);
  const checkMarkHoveredStyle = useMenuStyle({
    background: cssVar('--win32menubar-checked-background-hover-color', '#99F'),
  }, checked && isHovered);
  const iconStyle = useMenuStyle({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    justifySelf: 'end',
    height: cssVar('--win32menubar-label-icon-size', '16px'),
    width: cssVar('--win32menubar-label-icon-size', '16px'),
    padding: '2.2px',
    margin: '-2px 0 -2px -2px',
    ...checkMarkStyle,
    ...checkMarkHoveredStyle,
    ...rootIconStyle,
  }, [isHovered, checked]);
  
  return (
    <div style={containerStyle} onClick={onClick}>
      {(icon || !isRootMenu) && (
        <span style={iconStyle}>
          {checked ? checkedIcon : icon}
        </span>
      )}
      <AccessKeyHint {...{label, accessKey}} />
      <HotKeyHint hotKey={hotKey} />
      {isSubMenu && (
        <span style={iconStyle}>
          {expandIcon}
        </span>
      )}
    </div>
  );
}
