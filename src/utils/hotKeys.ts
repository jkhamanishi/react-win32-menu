/**
 * The hotkey string array, where modifier keys precedes the main key.
 * The strings are not case sensitive.
 * @example
 *   const hotkey: HotKey = ['Ctrl', 'Shift', 'Alt', 'D'];
 */
export type HotKey = string[];

/**
* Returns true if the keypress is a combination of modifier key (ctrl alt shift ) and any other key.
* @param event KeyboardEvent
*/
const isHotKey = (event: KeyboardEvent): boolean => {
  if (event.key === "Control" || event.key === "Alt" || event.key === "Shift") {
    return false; // Not a hotkey when the user only presses modifiers
  } else if (!event.altKey && !event.ctrlKey && !event.shiftKey) {
    return false; // Not a hotkey when no modifiers are pressed
  } else {
    return true;  // Could be a hotkey
  }
};

/**
* Creates a hotkey string array from a keyboard event.
* @param event - The keyboard event containing the user input hotkey.
* @returns A hotkey string array if a key is pressed with modifiers, null otherwise.
*/
export const keyWithModifiers = (event: KeyboardEvent): HotKey | null => {
  if (isHotKey(event)) {
    const keys: HotKey = [];
    if (event.ctrlKey)  keys.push("ctrl");
    if (event.altKey)   keys.push("alt");
    if (event.shiftKey) keys.push("shift");
    keys.push(event.key);
    return keys;
  } else {
    return null;
  }
};

/**
* Converts the hotkey string array into a normalized hotKey string.
* @param hotKeys - The hotkey string array.
* @returns A normalized hotKey string.
* @example
*   const key = normalizeKey(['Ctrl', 'Shift', 'Alt', 'D']);
*   console.log(key);  // Expected output: "ctrl+alt+shift+d" 
*/
export const normalizeKey = (hotKeys: HotKey): string | null => {
  let keys = hotKeys.slice().map(key => key.toLowerCase());
  const modifierKeys: HotKey = [];
  
  if ( keys.indexOf("ctrl")  > -1 ) modifierKeys.push("ctrl");
  if ( keys.indexOf("alt")   > -1 ) modifierKeys.push("alt");
  if ( keys.indexOf("shift") > -1 ) modifierKeys.push("shift");
  
  keys = keys.filter(k => ["ctrl", "alt", "shift"].indexOf(k) < 0);
  
  return (keys.length !== 1) ? null : [...modifierKeys, keys[0]].join('+');
};

/**
 * Utility class to help create a hotkey string array.
 */
export class Keys {
  static Ctrl(key: string): HotKey {
    return ["ctrl", key.trim()];
  }
  static Alt(key: string): HotKey {
    return ["alt", key.trim()];
  }
  static Shift(key: string): HotKey {
    return ["shift", key.trim()];
  }
  static CtrlAlt(key: string): HotKey {
    return ["ctrl", "alt", key.trim()];
  }
  static CtrlShift(key: string): HotKey {
    return ["ctrl", "shift", key.trim()];
  }
  static AltShift(key: string): HotKey {
    return ["alt", "shift", key.trim()];
  }
  static CtrlAltShift(key: string): HotKey {
    return ["ctrl", "alt", "shift", key.trim()];
  }
}
