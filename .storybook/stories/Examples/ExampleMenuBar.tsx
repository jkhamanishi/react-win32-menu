import { Win32MenuBar, MenuItem, RootMenu, SubMenu, Win32MenuStyleProps, Separator, Keys } from 'react-win32-menu';
import { action } from '@storybook/addon-actions';

function ExampleMenuBar(props: Win32MenuStyleProps) {
  return (
    <div style={{width: '100%', borderBottom: '1px solid lightgray'}}>
      <Win32MenuBar style={props}>
        <RootMenu label='File'>
          <MenuItem label='New' onSelect={action('New')} />
          <MenuItem label='Open...' hotKey={Keys.Ctrl('O')} onSelect={action('Open')} />
          <MenuItem label='Save' hotKey={Keys.Ctrl('S')} onSelect={action('Save')} />
          <MenuItem label='Save As...' hotKey={Keys.CtrlShift('S')} onSelect={action('Save As')} />
          <Separator />
          <MenuItem label='Print...' hotKey={Keys.Ctrl('P')} onSelect={action('Print')} />
          <Separator />
          <MenuItem label='Exit' onSelect={action('Exit')} />
        </RootMenu>
        <RootMenu label='Edit'>
          <MenuItem label='Undo' hotKey={Keys.Ctrl('Z')} onSelect={action('Undo')} />
          <Separator />
          <MenuItem label='Cut' hotKey={Keys.Ctrl('X')} onSelect={action('Cut')} />
          <MenuItem label='Copy' hotKey={Keys.Ctrl('C')} onSelect={action('Copy')} />
          <MenuItem label='Paste' hotKey={Keys.Ctrl('V')} onSelect={action('Paste')} />
          <Separator />
          <MenuItem label='Find...' hotKey={Keys.Ctrl('F')} onSelect={action('Find')} />
          <MenuItem label='Replace...' hotKey={Keys.Ctrl('H')} onSelect={action('Replace')} />
        </RootMenu>
        <RootMenu label='View'>
          <SubMenu label='Zoom'>
            <MenuItem label='Zoom In' onSelect={action('Zoom In')} />
            <MenuItem label='Zoom Out' onSelect={action('Zoom Out')} />
            <MenuItem label='Restore Zoom Default' hotKey={Keys.Ctrl('0')} onSelect={action('Restore Zoom')} />
          </SubMenu>
        </RootMenu>
        <RootMenu label='Help'>
          <MenuItem label='View Help' hotKey={Keys.Ctrl('/')} onSelect={action('View Help')} />
          <MenuItem label='Send Feedback' onSelect={action('Send Feedback')} />
          <Separator />
          <MenuItem label='Version' onSelect={action('Version')} />
        </RootMenu>
      </Win32MenuBar>
    </div>
  );
}

export default ExampleMenuBar;
