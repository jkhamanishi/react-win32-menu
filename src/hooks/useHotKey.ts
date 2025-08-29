import { RefObject, useEffect } from "react";
import { useMenuBarContext } from "../contexts/MenuBarContext";
import { HotKey, Keys } from "../utils/hotKeys";
import { EventCallback } from "./useHotKeyRegistration";

export default function useHotKey(
  ref: RefObject<HTMLLIElement>,
  disabled = false,
  focusKey?: string,
  hotKey?: HotKey,
  menuId?: string,
  onSelect?: EventCallback,
) {
  const menuBar = useMenuBarContext();
  const hotKeysEnabled = menuBar.hotKeysEnabled && !disabled;
  
  useEffect(function register() {
    if (!hotKeysEnabled) return;
    
    if (hotKey && onSelect) {
      menuBar.registerHotKey(hotKey, onSelect);
    }
    if (hotKey && !onSelect && menuId) {
      menuBar.registerHotKey(hotKey, () => menuBar.onSelect?.(menuId));
    }
    if (focusKey) {
      menuBar.registerHotKey(Keys.Alt(focusKey), () => ref.current?.focus());
    }
    return function unRegister() {
      if (hotKey) {
        menuBar.unregisterHotKey(hotKey);
      }
      if (focusKey) {
        menuBar.unregisterHotKey(Keys.Alt(focusKey));
      }
    };
  }, [hotKeysEnabled, hotKey, focusKey, menuId, onSelect]);
}