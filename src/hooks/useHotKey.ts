import { RefObject, useEffect } from "react";
import { useMenuBarContext } from "../contexts/MenuBarContext";
import { HotKey, Keys } from "../utils/hotKeys";
import { EventCallback, useHotKeyRegistration } from "../contexts/HotKeyContext";

export default function useHotKey(
  ref: RefObject<HTMLLIElement>,
  disabled = false,
  focusKey?: string,
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
    if (focusKey) {
      hotKeyRegistration.registerHotKey(Keys.Alt(focusKey), () => ref.current?.focus());
    }
    return function unRegister() {
      if (hotKey) {
        hotKeyRegistration.unregisterHotKey(hotKey);
      }
      if (focusKey) {
        hotKeyRegistration.unregisterHotKey(Keys.Alt(focusKey));
      }
    };
  }, [hotKeysEnabled, hotKey, focusKey, menuId, onSelect]);
}