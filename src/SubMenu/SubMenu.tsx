import { ReactNode } from "react";


export interface SubMenuProps {
  children?: ReactNode;
  label: string;
  primary?: boolean;
  backgroundColor?: string;
  onClick?: () => void;
  size?: "small" | "large";
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
