import { RefObject, useCallback, useEffect, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { useMenuBarContext } from "../contexts/MenuBarContext";

export default function useFocusWithin(ref: RefObject<HTMLElement>) {
  const menuBar = useMenuBarContext();
  const [focusWithin, setFocusWithin] = useState(false);
  
  const checkFocusWithin = useCallback(() => {
    setFocusWithin(ref.current.contains(document.activeElement));
  }, []);
  
  useEventListener('focusin', checkFocusWithin, ref);
  useEventListener('focusout', () => requestAnimationFrame(checkFocusWithin), ref);
  
  useEffect(() => {
    if (focusWithin) menuBar.activate(); 
  }, [focusWithin]);
  
  return focusWithin;
}
