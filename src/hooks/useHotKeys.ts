import { useCallback, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { keyWithModifiers, normalizeKey } from "../utils/hotKeys";


export type EventCallback = (e?: Event) => void;

export interface HotKeyRegistration {
  registerHotKey: (hotKey: string[], callback: EventCallback) => void;
  unregisterHotKey: (hotKey: string[]) => void;
}

export default function useHotKeys(enabled=true): HotKeyRegistration {
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
  
  const registerHotKey = useCallback((hotkey: Array<string>, callback: EventCallback): void => {
    const key = normalizeKey(hotkey);
    if (key) {
      if (callbacks[key]) {
        console.warn(`Duplicate hotkey ${key}. One of your hotkeys might not trigger`);
      }
      callbacks[key] = callback;
    }
  }, [callbacks]);
  
  const unregisterHotKey = useCallback((hotkey: Array<string>): void => {
    const key = normalizeKey(hotkey);
    if (key) {
      delete callbacks[key];
    }
  }, [callbacks]);
  
  return { registerHotKey, unregisterHotKey };
}