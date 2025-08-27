import { useState } from 'react';
import { Win32MenuBar, MenuItem, RootMenu, SubMenu, Keys, Win32MenuBarProps } from 'react-win32-menu';
import { action } from 'storybook/actions';

function ExampleMenuBar(props: Win32MenuBarProps) {
  const [keepOpen, setKeepOpen] = useState(true);
  const toggle = () => setKeepOpen(!keepOpen);
  
  return (
    <div style={{width: '100%', borderBottom: '1px solid lightgray'}}>
      <Win32MenuBar {...props} keepActive={keepOpen}>
        <RootMenu label='View' keepOpen={keepOpen}>
          <MenuItem label='Keep Open' onSelect={toggle} checked={keepOpen} />
          <SubMenu label='Zoom'>
            <MenuItem label='Zoom In' onSelect={action('Zoom In')} />
            <MenuItem label='Zoom Out' onSelect={action('Zoom Out')} />
            <MenuItem label='Restore Zoom Default' hotKey={Keys.Ctrl('0')} onSelect={action('Restore Zoom')} />
          </SubMenu>
        </RootMenu>
      </Win32MenuBar>
    </div>
  );
}

export default ExampleMenuBar;
