import { MouseEventHandler, ReactNode } from "react";
import { useMenuBarContext } from "../../contexts/MenuBarContext";
import { HotKeyHint, HotKeyHintProps } from "../HotKeyHint";


export interface MenuItemLabelProps extends HotKeyHintProps {
  label: string;
  focusKey?: string;
  icon?: ReactNode;
  checked?: boolean;
  isRootMenu?: boolean;
  isSubMenu?: boolean;
  onClick?: MouseEventHandler;
}

export function MenuItemLabel({
  label,
  focusKey,
  icon,
  checked,
  hotKey,
  isRootMenu,
  isSubMenu,
  onClick,
}: MenuItemLabelProps) {
  const { checkedIcon, expandIcon } = useMenuBarContext();
  
  return (
    <div onClick={onClick}>
      {checked ? (
        <span>{checkedIcon}</span>
      ) : (
        <span hidden={isRootMenu}>{icon}</span>
      )}
      {focusKey && label.includes(focusKey) ? (
        <span>
          {label.substring(0, label.indexOf(focusKey))}
          <span>{focusKey}</span>
          {label.substring(label.indexOf(focusKey) + 1)}
        </span>
      ) : (
        <span>{label}</span>
      )}
      <HotKeyHint hotKey={hotKey} />
      {isSubMenu && (
        <span>{expandIcon}</span>
      )}
    </div>
  );
}
