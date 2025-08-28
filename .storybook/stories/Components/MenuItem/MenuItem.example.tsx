import { Win32MenuBar, MenuItem, RootMenu, MenuItemProps } from 'react-win32-menu';
import { action } from 'storybook/actions';

function ExampleMenu(props: MenuItemProps) {
  return (
    <div style={{width: '100%', borderBottom: '1px solid lightgray'}}>
      <Win32MenuBar keepActive onSelect={action('Menu Bar')}>
        <RootMenu label='Menu' keepOpen>
          <MenuItem {...props} onSelect={props.menuId ? undefined : action('Menu Item')} />
        </RootMenu>
      </Win32MenuBar>
    </div>
  );
}

export default ExampleMenu;
