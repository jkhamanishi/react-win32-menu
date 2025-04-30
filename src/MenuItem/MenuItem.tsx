
export interface MenuItemProps {
  label: string;
  primary?: boolean;
  backgroundColor?: string;
  onClick?: () => void;
  size?: "small" | "large";
}

export function MenuItem({label}: MenuItemProps) {
  
  
  return (
    <li>
      <div>
        {label}
      </div>
    </li>
  );
}

