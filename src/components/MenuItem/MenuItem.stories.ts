import { Meta, StoryObj } from '@storybook/react-vite';
import { args, Props } from '../../../.storybook/utils';

import ExampleMenu from './MenuItem.example';
import source from './MenuItem.example.tsx?raw';
import { Keys } from '../../utils/hotKeys';


type TArgs = Props<typeof ExampleMenu>;

const meta = {
  title: 'Components/MenuItem',
  component: ExampleMenu,
  parameters: {
    layout: 'padded',
    docs: {
      source: { code: source },
    },
    controls: {
      exclude: ['onSelect', 'keepOpenOnSelect', 'icon'],
    },
  },
  ...args<TArgs>({
    label: {
      description: 'The label text of the menu item.',
      type: 'string',
      required: true,
      control: 'text',
    },
    show: {
      description: 'Show the menu item.',
      type: 'boolean',
      control: 'boolean',
      defaultValue: true,
    },
    disabled: {
      description: 'Disable the menu item from being selected.',
      type: 'boolean',
      control: 'boolean',
      defaultValue: false,
    },
    icon: {
      description: 'The icon to display alongside the item. Will be hidden if `checked=true`.',
      type: 'ReactNode',
      control: false,
    },
    focusKey: {
      description: 'The key representing the menu item when in Alt-mode. The key will be underlined in the label.',
      type: 'string',
      control: 'text',
    },
    menuId: {
      description: 'The string value argument passed to the `onSelect` callback set on the parent `Win32MenuBar` component.',
      type: 'string',
      control: 'text',
    },
    checked: {
      description: 'Show check mark icon',
      type: 'boolean',
      control: 'boolean',
      defaultValue: false,
    },
    onSelect: {
      description: 'The menu item selection handler. If not provided, the `menuId` will be passed to the `onSelect` callback set on the parent `Win32MenuBar` component when evoked.',
      type: '(e?: Event) => void',
      control: false,
    },
    keepOpenOnSelect: {
      description: 'When selected, keep the menu open.',
      type: 'boolean',
      control: false,
      defaultValue: false,
    },
    hotKey: {
      description: 'The hotkey string array. Use the `Keys` utility class to create hotkeys.',
      type: 'HotKey',
      control: 'object',
    },
  }),
} satisfies Meta<typeof ExampleMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HotkeyExample: Story = {
  args: {
    label: 'Menu Item',
    hotKey: Keys.CtrlShift('H'),
  },
  argTypes: {
    focusKey: { table: { disable: true } },
  }
};

export const FocusKeyExample: Story = {
  args: {
    label: 'Menu Item',
    focusKey: 'n',
  },
  argTypes: {
    hotKey: { table: { disable: true } },
  }
};

export const MenuIDExample: Story = {
  args: {
    label: 'Menu Item',
    menuId: 'item',
    hotKey: Keys.CtrlShift('H'),
  },
  argTypes: {
    show: { table: { disable: true } },
    disabled: { table: { disable: true } },
    checked: { table: { disable: true } },
    hotKey: { table: { disable: true } },
    focusKey: { table: { disable: true } },
  }
};
