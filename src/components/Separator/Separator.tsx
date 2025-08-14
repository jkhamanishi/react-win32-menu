import { cssVar } from "../../hooks/useMenuStyle";


export function Separator() {
  return (
    <div style={{
      padding: cssVar('--win32menubar-label-padding', '4px 6px'),
      paddingTop: cssVar('--win32menubar-separator-padding', '2px'),
      paddingBottom: cssVar('--win32menubar-separator-padding', '2px'),
      gridColumn: 'span 3',
    }}>
      <div style={{
        paddingLeft: cssVar('--win32menubar-label-icon-gap', '4px'),
      }}>
        <div style={{
          borderBottom: '1px solid ' + cssVar('--win32menubar-separator-color', 'lightgrey'),
          marginLeft: cssVar('--win32menubar-label-icon-size', '16px'),
        }} />
      </div>
    </div>
  );
}
