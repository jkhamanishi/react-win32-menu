import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'react-win32-menu',
  brandUrl: 'https://github.com/jkhamanishi/react-win32-menu',
  brandTarget: '_self',
});

addons.setConfig({ theme });
