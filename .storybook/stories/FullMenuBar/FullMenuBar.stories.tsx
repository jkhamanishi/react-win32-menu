import { Meta } from '@storybook/react-vite';
import { args } from '../../utils';
import ExampleMenuBar from './FullMenuBar';
import source from './FullMenuBar.tsx?raw';

export default {
  title: 'Examples/Full Menu Bar',
  component: ExampleMenuBar,
  parameters: {
    layout: 'padded',
    storySource: { source },
  },
  ...args<typeof ExampleMenuBar>({
    background: {
      description: 'The background of the menu bar.', 
      defaultValue: 'inherit',
      control: 'color',
    },
    color: {
      description: 'The font color of the menu labels.', 
      defaultValue: 'inherit',
      control: 'color',
    },
    outline: {
      description: 'The persistent outline of the menu bar.',
      defaultValue: 'none',
      control: 'text',
    },
    padding: {
      description: 'The padding of the menu bar.',
      defaultValue: '0',
      control: 'text',
    },
    margin: {
      description: 'The margin of the menu bar.',
      defaultValue: '0',
      control: 'text',
    },
    zIndex: {
      description: 'The z-index of the menus.',
      defaultValue: 100,
      control: 'number',
    },
    fontFamily: {
      description: 'The font family of the menu labels.',
      defaultValue: 'sans-serif',
      control: 'text',
    },
    fontSize: {
      description: 'The font size of the menu labels.',
      defaultValue: 'inherit',
      control: 'text',
    },
    menuMinWidth: {
      description: 'The minimum width of the menus.',
      defaultValue: '150px',
      control: 'text',
    },
    menuPadding: {
      description: 'The content padding size of the menus.',
      defaultValue: '0',
      control: 'text',
    },
    menuMargin: {
      description: 'The margin size of the menus.',
      defaultValue: '0',
      control: 'text',
    },
    menuBackground: {
      description: 'The background of the menus.',
      defaultValue: '#EEE',
      control: 'color',
    },
    menuBorder: {
      description: 'The border style of the menus.',
      defaultValue: '1px solid #888',
      control: 'text',
    },
    menuBorderRadius: {
      description: 'The border radius of the menus',
      defaultValue: '0',
      control: 'text',
    },
    menuBoxShadow: {
      description: 'The box shadow style of the menus.',
      defaultValue: '2px 2px 2px #555',
      control: 'text',
    },
    rootLabelHeight: {
      description: 'The height of the root menu labels.',
      defaultValue: 'auto',
      control: 'text',
    },
    rootHoverBackground: {
      description: 'The background of the root menu labels when hovered or focused.',
      defaultValue: '#DDF',
      control: 'color',
    },
    rootHoverColor: {
      description: 'The font color of the root menu labels when hovered or focused.',
      defaultValue: '#000',
      control: 'color',
    },
    rootIconSize: {
      description: 'The size of the root menu label icon.',
      defaultValue: '12px',
      control: 'text',
    },
    labelHeight: {
      description: 'The height of the menu item labels.',
      defaultValue: 'auto',
      control: 'text',
    },
    labelPadding: {
      description: 'The content padding for the menu item labels.',
      defaultValue: '4px 6px',
      control: 'text',
    },
    labelTextAlign: {
      description: 'Text alignment of the menu item labels.',
      defaultValue: 'left',
      control: 'select',
      options: ['center', 'end', 'justify', 'left', 'match-parent', 'right', 'start'],
    },
    labelIconGap: {
      description: 'The gap between the menu item icon and label.',
      defaultValue: '4px',
      control: 'text',
    },
    labelIconSize: {
      description: 'The size of the menu item icon.',
      defaultValue: '16px',
      control: 'text',
    },
    hotkeyFontSize: {
      description: 'The font size of the hotkey hints.',
      defaultValue: '.8em',
      control: 'text',
    },
    hotkeyFontStyle: {
      description: 'The font style of the hotkey hints.',
      defaultValue: 'oblique',
      control: 'text',
    },
    hotkeyPaddingLeft: {
      description: 'The left padding of the hotkey hints.',
      defaultValue: '8px',
      control: 'text',
    },
    hoverBackground: {
      description: 'The background of the menu item labels when hovered or focused.',
      defaultValue: '#BBF',
      control: 'color',
    },
    hoverColor: {
      description: 'The font color of the menu item labels when hovered or focused.',
      defaultValue: '#000',
      control: 'color',
    },
    separatorColor: {
      description: 'The color of the separator.',
      defaultValue: 'lightgrey',
      control: 'color',
    },
    separatorHeight: {
      description: 'The thickness of the separator.',
      defaultValue: '1px',
      control: 'text',
    },
    separatorPadding: {
      description: 'The padding above and below the separator.',
      defaultValue: '2px',
      control: 'text',
    },
  }),
} satisfies Meta<typeof ExampleMenuBar>;

export const Example = ExampleMenuBar;
