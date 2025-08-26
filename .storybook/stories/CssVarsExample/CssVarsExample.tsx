import { Win32MenuCSSVars } from 'react-win32-menu';
import { FullMenuBarExample } from '../FullMenuBar';

function ExampleMenuBar(cssVars: Win32MenuCSSVars) {
  return (
    <div style={{width: '100%', ...cssVars}}>
      <FullMenuBarExample />
    </div>
  );
}

export default ExampleMenuBar;
