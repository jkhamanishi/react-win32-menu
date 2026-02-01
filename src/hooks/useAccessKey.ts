import { RefObject } from "react";
import { useEventListener } from "usehooks-ts";

import { EventCallback } from "../contexts/HotKeyContext";
import { useAccessKeysContext } from "../contexts/AccessKeysContext";
import { useMenuBarContext } from "../contexts/MenuBarContext";

import { firstChildMenu, isRootMenu } from "../utils/menuTraversal";


export default function useAccessKey(
  ref: RefObject<HTMLLIElement>,
  accessKey: string | undefined,
  onSelect: EventCallback | undefined | null,
) {
  const menuBar = useMenuBarContext();
  const { active, deactivate } = useAccessKeysContext();
  const blur = () => {
    (document.activeElement as HTMLElement).blur();
    menuBar.deactivate();
  };
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!active || e.key.toLowerCase() !== accessKey?.toLowerCase()) return;
    
    const isRoot = isRootMenu(ref.current);
    const menuFocused = ref.current.parentElement?.contains(document.activeElement);
    
    if ((isRoot && !menuFocused) || (!isRoot && menuFocused)) {
      if (onSelect) {
        deactivate();
        blur();
        onSelect(e);
      } else if (ref.current) {
        const childMenu = firstChildMenu(ref.current) as HTMLLIElement;
        childMenu?.focus();
      }
      e.preventDefault();
    }
  };
  
  useEventListener("keydown", handleKeyDown);
}