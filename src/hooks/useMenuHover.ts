import { ReactNode, RefObject } from "react";
import { useEventListener } from "usehooks-ts";
import { useMenuBarContext } from "../contexts/MenuBarContext";
import { parentMenu } from "../utils/menuTraversal";


export default function useMenuHover(ref: RefObject<HTMLLIElement>, children?: ReactNode) {
  const menuBar = useMenuBarContext();
  
  useEventListener('mouseover', (event: MouseEvent) => {
    if (!menuBar.active) return;
    ref.current?.focus();
    event.stopPropagation();
  }, ref);
  
  useEventListener('mouseleave', (event: MouseEvent) => {
    if (!menuBar.active || children) return;
    const parent = parentMenu(ref.current) as HTMLLIElement;
    parent?.focus();
    event.stopPropagation();
  }, ref);
}
