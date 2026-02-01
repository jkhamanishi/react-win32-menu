import { createElement, ReactNode, useCallback, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { HotKey, keyWithModifiers, normalizeKey } from "../utils/hotKeys";
import { useMenuBarConfig } from "./ConfigContext";
import createContext from "./createContext";


export type EventCallback = (e?: Event) => void;

export interface HotKeyRegistration {
  registerHotKey: (hotKey: HotKey, callback: EventCallback) => void;
  unregisterHotKey: (hotKey: HotKey) => void;
}

const [ContextProvider, useContext] = createContext<HotKeyRegistration>("HotKeyContext");

export function HotKeyContextProvider({children}: {children: ReactNode}) {
  const { hotKeysEnabled, disabled } = useMenuBarConfig();
  const enabled = (hotKeysEnabled && !disabled);
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
  
  
  useEventListener('keydown', hotKeyHandler);
  
  const value: HotKeyRegistration = {
    registerHotKey, unregisterHotKey
  };
  
  return createElement(ContextProvider, {value}, children);
}

export function useHotKeyRegistration() {
  return useContext();
}
