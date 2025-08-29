import { cssVar } from "../../hooks/useMenuStyle";


export function Separator() {
  return (
    <div style={{
      padding: cssVar('--win32menubar-label-padding', '4px 6px'),  // Only the horizontal padding is inherited.
      paddingTop: cssVar('--win32menubar-separator-padding', '2px'),
      paddingBottom: cssVar('--win32menubar-separator-padding', '2px'),
      gridColumn: 'span 3',
    }}>
      <div style={{
        paddingLeft: cssVar('--win32menubar-label-icon-gap', '4px'),
      }}>
        <div style={{
          borderBottomWidth: cssVar('--win32menubar-separator-height', '1px'),
          borderBottomStyle: 'solid',
          borderBottomColor: cssVar('--win32menubar-separator-color', 'lightgrey'),
          marginLeft: cssVar('--win32menubar-label-icon-size', '16px'),
        }} />
      </div>
    </div>
  );
}
