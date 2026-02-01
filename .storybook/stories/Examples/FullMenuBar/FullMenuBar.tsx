import { Win32MenuBar, MenuItem, RootMenu, SubMenu, Separator, Keys, Win32MenuStyleProps } from 'react-win32-menu';
import { action } from 'storybook/actions';

function ExampleMenuBar(props: Win32MenuStyleProps) {
  return (
    <div style={{width: '100%', borderBottom: '1px solid lightgray'}}>
      <Win32MenuBar style={props}>
        <RootMenu label='File' accessKey='F'>
          <MenuItem label='New' hotKey={Keys.CtrlAlt('N')} accessKey='N' onSelect={action('New')} />
          <MenuItem label='Open...' hotKey={Keys.Ctrl('O')} accessKey='O' onSelect={action('Open')} />
          <MenuItem label='Save' hotKey={Keys.Ctrl('S')} accessKey='S' onSelect={action('Save')} />
          <MenuItem label='Save As...' hotKey={Keys.CtrlShift('S')} accessKey='A' onSelect={action('Save As')} />
          <Separator />
          <MenuItem label='Print...' hotKey={Keys.Ctrl('P')} accessKey='P' onSelect={action('Print')} />
          <Separator />
          <MenuItem label='Exit' accessKey='E' onSelect={action('Exit')} disabled />
        </RootMenu>
        <RootMenu label='Edit' accessKey='E'>
          <MenuItem label='Undo' hotKey={Keys.Ctrl('Z')} accessKey='U' onSelect={action('Undo')} />
          <Separator />
          <MenuItem label='Cut' hotKey={Keys.Ctrl('X')} accessKey='t' onSelect={action('Cut')} />
          <MenuItem label='Copy' hotKey={Keys.Ctrl('C')} accessKey='C' onSelect={action('Copy')} />
          <MenuItem label='Paste' hotKey={Keys.Ctrl('V')} accessKey='P' onSelect={action('Paste')} />
          <Separator />
          <MenuItem label='Find...' hotKey={Keys.Ctrl('F')} accessKey='F' onSelect={action('Find')} />
          <MenuItem label='Replace...' hotKey={Keys.Ctrl('H')} accessKey='R' onSelect={action('Replace')} />
        </RootMenu>
        <RootMenu label='View' accessKey='V'>
          <SubMenu label='Zoom' accessKey='Z'>
            <MenuItem label='Zoom In' accessKey='I' onSelect={action('Zoom In')} keepOpenOnSelect />
            <MenuItem label='Zoom Out' accessKey='O' onSelect={action('Zoom Out')} keepOpenOnSelect />
            <MenuItem label='Restore Zoom Default' hotKey={Keys.Ctrl('0')} accessKey='R' onSelect={action('Restore Zoom')} />
          </SubMenu>
          <MenuItem label='Word Wrap' checked accessKey='W' onSelect={action('Word Wrap')} />
        </RootMenu>
        <RootMenu label='Help' accessKey='H'>
          <MenuItem label='View Help' hotKey={Keys.Ctrl('/')} accessKey='H' onSelect={action('View Help')} />
          <MenuItem label='Send Feedback' accessKey='F' onSelect={action('Send Feedback')} />
          <Separator />
          <MenuItem label='Version' accessKey='V' onSelect={action('Version')} />
        </RootMenu>
      </Win32MenuBar>
    </div>
  );
}

export default ExampleMenuBar;
