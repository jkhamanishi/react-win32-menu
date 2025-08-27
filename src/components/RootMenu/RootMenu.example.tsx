import { Win32MenuBar, MenuItem, RootMenu, Separator, Keys, RootMenuProps } from 'react-win32-menu';
import { action } from 'storybook/actions';

function ExampleMenuBar(props: RootMenuProps) {
  return (
    <div style={{width: '100%', borderBottom: '1px solid lightgray'}}>
      <Win32MenuBar>
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
        <RootMenu {...props}>
          <MenuItem label='Undo' hotKey={Keys.Ctrl('Z')} onSelect={action('Undo')} />
          <Separator />
          <MenuItem label='Cut' hotKey={Keys.Ctrl('X')} onSelect={action('Cut')} />
          <MenuItem label='Copy' hotKey={Keys.Ctrl('C')} onSelect={action('Copy')} />
          <MenuItem label='Paste' hotKey={Keys.Ctrl('V')} onSelect={action('Paste')} />
          <Separator />
          <MenuItem label='Find...' hotKey={Keys.Ctrl('F')} onSelect={action('Find')} />
          <MenuItem label='Replace...' hotKey={Keys.Ctrl('H')} onSelect={action('Replace')} />
        </RootMenu>
      </Win32MenuBar>
    </div>
  );
}

export default ExampleMenuBar;
