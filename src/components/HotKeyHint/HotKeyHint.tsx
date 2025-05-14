import { useMenuBarContext } from "../../contexts/MenuBarContext";
import { HotKey } from "../../utils/hotKeys";
import toTitleCase from "../../utils/toTitleCase";


export interface HotKeyHintProps {
  hotKey?: HotKey;
}

export function HotKeyHint({hotKey}: HotKeyHintProps) {
  const { hotKeysEnabled } = useMenuBarContext();
  
  return hotKeysEnabled && hotKey && (
    <span>{hotKey.map(toTitleCase).join('+')}</span>
  );
}
