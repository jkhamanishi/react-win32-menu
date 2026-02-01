import { useAccessKeysContext } from "../../contexts/AccessKeysContext";
import useMenuStyle from "../../hooks/useMenuStyle";


export interface AccessKeyHintProps {
  label: string;
  accessKey?: string;
}

export function AccessKeyHint({
  label,
  accessKey,
}: AccessKeyHintProps) {
  const { active } = useAccessKeysContext();
  const showAccessKey = active && accessKey && label.includes(accessKey);
  
  const labelStyle = useMenuStyle({
    width: 'max-content',
  });
  
  return showAccessKey ? (
    <span style={labelStyle}>
      {label.substring(0, label.indexOf(accessKey))}
      <u>{accessKey}</u>
      {label.substring(label.indexOf(accessKey) + 1)}
    </span>
  ) : (
    <span style={labelStyle}>
      {label}
    </span>
  );
}


