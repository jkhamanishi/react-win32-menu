import { ReactNode } from "react";


export interface Win32MenuBarProps {
  children: ReactNode;
}

/** The main menu bar component. Wraps this component around all root menus. */
export function Win32MenuBar({children}: Win32MenuBarProps) {
  
  
  return (
    <ul>
      {children}
    </ul>
  );
}

