import { useCallback, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { HotKey, keyWithModifiers, normalizeKey } from "../utils/hotKeys";


export type EventCallback = (e?: Event) => void;

export interface HotKeyRegistration {
  registerHotKey: (hotKey: HotKey, callback: EventCallback) => void;
  unregisterHotKey: (hotKey: HotKey) => void;
}

export default function useHotKeyRegistration(enabled=true): HotKeyRegistration {
  const [callbacks] = useState<Record<string, EventCallback>>({});
  
  const hotKeyHandler = useCallback((keyboardEvent: KeyboardEvent): void => {
    if (!enabled) return;
    
    const hotKeyPressed = keyWithModifiers(keyboardEvent);
    if (hotKeyPressed) {
      const key = normalizeKey(hotKeyPressed);
      if (key && callbacks[key]) {
        keyboardEvent.stopPropagation();
        keyboardEvent.preventDefault();
        const callback = callbacks[key];
        callback(keyboardEvent);
      }
    }
  }, [enabled, callbacks]);
  
  useEventListener('keydown', hotKeyHandler);
  
  const registerHotKey = useCallback((hotkey: HotKey, callback: EventCallback): void => {
    const key = normalizeKey(hotkey);
    if (key) {
      if (callbacks[key]) {
        console.warn(`Duplicate hotkey ${key}. One of your hotkeys might not trigger`);
      }
      callbacks[key] = callback;
    }
  }, [callbacks]);
  
  const unregisterHotKey = useCallback((hotkey: HotKey): void => {
    const key = normalizeKey(hotkey);
    if (key) {
      delete callbacks[key];
    }
  }, [callbacks]);
  
  return { registerHotKey, unregisterHotKey };
}