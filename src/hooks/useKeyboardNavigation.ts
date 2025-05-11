import { RefObject, useCallback } from "react";
import { useEventListener } from "usehooks-ts";

import { Key } from "../utils/Keyboard";
import { firstChildMenu, isRootMenu, lastChildMenu, nextMenu, nextRootMenu, parentMenu } from "../utils/menuTraversal";

export default function useKeyboardNavigation(ref: RefObject<HTMLElement>, disabled=false): void {
  const handleKeyNavigation = useCallback((event: KeyboardEvent) => {
    if (disabled) return;
    
    const currentMenu = document.activeElement;
    let nextFocusElement: Element | null = null;
    switch (event.key) {
      case Key.ESC:
        (document.activeElement as HTMLElement).blur();
        break;
      case Key.DOWN:
        nextFocusElement = isRootMenu(currentMenu) ? firstChildMenu(currentMenu) : nextMenu(currentMenu, 'DOWN');
        break;
      case Key.UP:
        nextFocusElement = isRootMenu(currentMenu) ? lastChildMenu(currentMenu) : nextMenu(currentMenu, 'UP');
        break;
      case Key.RIGHT: {
        const childMenu = firstChildMenu(currentMenu);
        nextFocusElement = isRootMenu(currentMenu) || !childMenu ? nextRootMenu(currentMenu, 'RIGHT') : childMenu;
        break;
      }
      case Key.LEFT: {
        const parent = parentMenu(currentMenu);
        nextFocusElement = isRootMenu(parent) || !parent ? nextRootMenu(currentMenu, 'LEFT') : parent;
        break;
      }
    }
    
    (nextFocusElement as HTMLLIElement)?.focus();
  }, [disabled]);
  
  useEventListener('keydown', handleKeyNavigation, ref);
}
