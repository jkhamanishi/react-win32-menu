import { RefObject, useCallback, useState } from "react";
import { useEventListener } from "usehooks-ts";

export default function useFocusWithin(ref: RefObject<HTMLElement>) {
  const [focusWithin, setFocusWithin] = useState(false);
  
  const checkFocusWithin = useCallback(() => {
    setFocusWithin(ref.current.contains(document.activeElement));
  }, []);
  
  useEventListener('focusin', checkFocusWithin, ref);
  useEventListener('focusout', () => requestAnimationFrame(checkFocusWithin), ref);
  
  return focusWithin;
}
