import { ReactNode } from "react";


export interface SubMenuProps {
  children: ReactNode;
  label: string;
}

export function SubMenu({label, children}: SubMenuProps) {
  
  
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
