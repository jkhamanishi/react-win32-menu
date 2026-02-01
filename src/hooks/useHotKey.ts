import { useEffect } from "react";
import { useMenuBarContext } from "../contexts/MenuBarContext";
import { HotKey } from "../utils/hotKeys";
import { EventCallback, useHotKeyRegistration } from "../contexts/HotKeyContext";

export default function useHotKey(
  disabled = false,
  hotKey?: HotKey,
  menuId?: string,
  onSelect?: EventCallback,
) {
  const menuBar = useMenuBarContext();
  const hotKeyRegistration = useHotKeyRegistration();
  const hotKeysEnabled = menuBar.hotKeysEnabled && !disabled;
  
  useEffect(function register() {
    if (!hotKeysEnabled) return;
    
    if (hotKey && onSelect) {
      hotKeyRegistration.registerHotKey(hotKey, onSelect);
    }
    if (hotKey && !onSelect && menuId) {
      hotKeyRegistration.registerHotKey(hotKey, () => menuBar.onSelect?.(menuId));
    }
    return function unRegister() {
      if (hotKey) {
        hotKeyRegistration.unregisterHotKey(hotKey);
      }
    };
  }, [hotKeysEnabled, hotKey, menuId, onSelect]);
}