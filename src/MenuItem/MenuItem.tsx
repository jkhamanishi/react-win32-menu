
export interface MenuItemProps {
  label: string;
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

