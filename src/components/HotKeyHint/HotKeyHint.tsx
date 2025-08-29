import { useMenuBarContext } from "../../contexts/MenuBarContext";
import { cssVar, useMenuStyle } from "../../hooks/useMenuStyle";
import { HotKey } from "../../utils/hotKeys";
import toTitleCase from "../../utils/toTitleCase";


export interface HotKeyHintProps {
  hotKey?: HotKey;
}

export function HotKeyHint({hotKey}: HotKeyHintProps) {
  const { hotKeysEnabled } = useMenuBarContext();
  
  const style = useMenuStyle({
    fontSize: cssVar('--win32menubar-hotkey-font-size', '.8em'),
    fontStyle: cssVar('--win32menubar-hotkey-font-style', 'oblique'),
    paddingLeft: cssVar('--win32menubar-hotkey-padding-left', '8px'),
    textAlign: 'right',
  });
  
  return hotKeysEnabled && hotKey && (
    <span style={style}>
      {hotKey.map(toTitleCase).join('+')}
    </span>
  );
}
