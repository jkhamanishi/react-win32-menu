import { Win32MenuBar, MenuItem, RootMenu, SubMenu, Keys, SubMenuProps } from 'react-win32-menu';
import { action } from 'storybook/actions';

function ExampleMenuBar(props: SubMenuProps) {
  return (
    <div style={{width: '100%', borderBottom: '1px solid lightgray'}}>
      <Win32MenuBar keepActive>
        <RootMenu label='View' keepOpen>
          <SubMenu {...props}>
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
