import { Win32MenuBar, MenuItem, RootMenu, Separator, Keys, Win32MenuStyleProps } from 'react-win32-menu';
import { action } from 'storybook/actions';

function ExampleMenu(props: Win32MenuStyleProps) {
  return (
    <div style={{width: '100%', borderBottom: '1px solid lightgray'}}>
      <Win32MenuBar keepActive style={props}>
        <RootMenu label='File' keepOpen>
          <MenuItem label='New' onSelect={action('New')} />
          <MenuItem label='Open...' hotKey={Keys.Ctrl('O')} onSelect={action('Open')} />
          <MenuItem label='Save' hotKey={Keys.Ctrl('S')} onSelect={action('Save')} />
          <MenuItem label='Save As...' hotKey={Keys.CtrlShift('S')} onSelect={action('Save As')} />
          <Separator />
          <MenuItem label='Print...' hotKey={Keys.Ctrl('P')} onSelect={action('Print')} />
          <Separator />
          <MenuItem label='Exit' onSelect={action('Exit')} />
        </RootMenu>
      </Win32MenuBar>
    </div>
  );
}

export default ExampleMenu;
