import { RefObject, useCallback, useState } from "react";
import { useEventListener } from "usehooks-ts";

function useFocused(ref: RefObject<HTMLElement>) {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = useCallback((event: FocusEvent) => {
    if (event.target === ref.current) {
      setIsFocused(true);
    }
  }, []);
  
  const handleBlur = useCallback((event: FocusEvent) => {
    requestAnimationFrame(() => {
      if (event.target === ref.current) {
        setIsFocused(false);
      }
    });
  }, []);
  
  useEventListener('focus', handleFocus, ref);
  useEventListener('blur', handleBlur, ref);
  
  return isFocused;
}

export default useFocused;
