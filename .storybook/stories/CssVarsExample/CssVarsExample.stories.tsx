import { Meta } from '@storybook/react';
import { args } from '../../utils';
import ExampleMenuBar from './CssVarsExample';
import source from './CssVarsExample.tsx?raw';

export default {
  title: 'Examples/CSS Variables',
  component: ExampleMenuBar,
  parameters: {
    layout: 'padded',
    storySource: { source },
  },
  ...args<typeof ExampleMenuBar>({
    '--win32menubar-background': {
      description: 'The background of the menu bar.', 
      defaultValue: 'inherit',
      control: 'color',
    },
    '--win32menubar-color': {
      description: 'The font color of the menu labels.', 
      defaultValue: 'inherit',
      control: 'color',
    },
    '--win32menubar-outline': {
      description: 'The persistent outline of the menu bar.',
      defaultValue: 'none',
      control: 'text',
    },
    '--win32menubar-padding': {
      description: 'The padding of the menu bar.',
      defaultValue: '0',
      control: 'text',
    },
    '--win32menubar-margin': {
      description: 'The margin of the menu bar.',
      defaultValue: '0',
      control: 'text',
    },
    '--win32menubar-z-index': {
      description: 'The z-index of the menus.',
      defaultValue: 100,
      control: 'number',
    },
    '--win32menubar-font-family': {
      description: 'The font family of the menu labels.',
      defaultValue: 'sans-serif',
      control: 'text',
    },
    '--win32menubar-font-size': {
      description: 'The font size of the menu labels.',
      defaultValue: 'inherit',
      control: 'text',
    },
    '--win32menubar-menu-min-width': {
      description: 'The minimum width of the menus.',
      defaultValue: '150px',
      control: 'text',
    },
    '--win32menubar-menu-padding': {
      description: 'The content padding size of the menus.',
      defaultValue: '0',
      control: 'text',
    },
    '--win32menubar-menu-margin': {
      description: 'The margin size of the menus.',
      defaultValue: '0',
      control: 'text',
    },
    '--win32menubar-menu-background': {
      description: 'The background of the menus.',
      defaultValue: '#EEE',
      control: 'color',
    },
    '--win32menubar-menu-border': {
      description: 'The border style of the menus.',
      defaultValue: '1px solid #888',
      control: 'text',
    },
    '--win32menubar-menu-border-radius': {
      description: 'The border radius of the menus',
      defaultValue: '0',
      control: 'text',
    },
    '--win32menubar-menu-box-shadow': {
      description: 'The box shadow style of the menus.',
      defaultValue: '2px 2px 2px #555',
      control: 'text',
    },
    '--win32menubar-root-label-height': {
      description: 'The height of the root menu labels.',
      defaultValue: 'auto',
      control: 'text',
    },
    '--win32menubar-root-hover-background': {
      description: 'The background of the root menu labels when hovered or focused.',
      defaultValue: '#DDF',
      control: 'color',
    },
    '--win32menubar-root-hover-color': {
      description: 'The font color of the root menu labels when hovered or focused.',
      defaultValue: '#000',
      control: 'color',
    },
    '--win32menubar-root-icon-size': {
      description: 'The size of the root menu label icon.',
      defaultValue: '12px',
      control: 'text',
    },
    '--win32menubar-label-height': {
      description: 'The height of the menu item labels.',
      defaultValue: 'auto',
      control: 'text',
    },
    '--win32menubar-label-padding': {
      description: 'The content padding for the menu item labels.',
      defaultValue: '4px 6px',
      control: 'text',
    },
    '--win32menubar-label-text-align': {
      description: 'Text alignment of the menu item labels.',
      defaultValue: 'left',
      control: 'select',
      options: ['center', 'end', 'justify', 'left', 'match-parent', 'right', 'start'],
    },
    '--win32menubar-label-icon-gap': {
      description: 'The gap between the menu item icon and label.',
      defaultValue: '4px',
      control: 'text',
    },
    '--win32menubar-label-icon-size': {
      description: 'The size of the menu item icon.',
      defaultValue: '16px',
      control: 'text',
    },
    '--win32menubar-hotkey-font-size': {
      description: 'The font size of the hotkey hints.',
      defaultValue: '.8em',
      control: 'text',
    },
    '--win32menubar-hotkey-font-style': {
      description: 'The font style of the hotkey hints.',
      defaultValue: 'oblique',
      control: 'text',
    },
    '--win32menubar-hotkey-padding-left': {
      description: 'The left padding of the hotkey hints.',
      defaultValue: '8px',
      control: 'text',
    },
    '--win32menubar-hover-background': {
      description: 'The background of the menu item labels when hovered or focused.',
      defaultValue: '#BBF',
      control: 'color',
    },
    '--win32menubar-hover-color': {
      description: 'The font color of the menu item labels when hovered or focused.',
      defaultValue: '#000',
      control: 'color',
    },
    '--win32menubar-separator-color': {
      description: 'The color of the separator.',
      defaultValue: 'lightgrey',
      control: 'color',
    },
    '--win32menubar-separator-height': {
      description: 'The thickness of the separator.',
      defaultValue: '1px',
      control: 'text',
    },
    '--win32menubar-separator-padding': {
      description: 'The padding above and below the separator.',
      defaultValue: '2px',
      control: 'text',
    },
  }),
} satisfies Meta<typeof ExampleMenuBar>;

export const Example = ExampleMenuBar;
