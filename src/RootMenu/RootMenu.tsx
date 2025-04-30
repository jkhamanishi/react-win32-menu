import { ReactNode } from "react";


export interface RootMenuProps {
  children?: ReactNode;
  label: string;
}

export function RootMenu({label, children}: RootMenuProps) {
  
  
  return (
    <li>
      <div>
        {label}
      </div>
      <ul>
        {children}
      </ul>
    </li>
  );
}
