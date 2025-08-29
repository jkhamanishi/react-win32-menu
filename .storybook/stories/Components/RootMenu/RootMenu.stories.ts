import { Meta, StoryObj } from '@storybook/react-vite';
import { args, Props } from '../../../utils';

import ExampleMenu from './RootMenu.example';
import source from './RootMenu.example.tsx?raw';


type TArgs = Props<typeof ExampleMenu>;

const meta = {
  title: 'Components/RootMenu',
  component: ExampleMenu,
  parameters: {
    layout: 'padded',
    docs: {
      source: { code: source },
    },
    controls: {
      exclude: ['children', 'icon'],
    },
  },
  ...args<TArgs>({
    label: {
      description: 'The label text of the menu.',
      type: 'string',
      required: true,
      control: 'text',
    },
    show: {
      description: 'Show the menu label.',
      type: 'boolean',
      control: 'boolean',
      defaultValue: true,
    },
    disabled: {
      description: 'Disable opening the menu.',
      type: 'boolean',
      control: 'boolean',
      defaultValue: false,
    },
    icon: {
      description: 'The icon to display alongside the menu label.',
      type: 'ReactNode',
      control: false,
    },
    focusKey: {
      description: 'The key representing the menu when in Alt-mode. The key will be underlined in the label.',
      type: 'string',
      control: 'text',
    },
    children: {
      description: 'The menu items as `MenuItem` components.',
      control: false,
      type: 'ReactNode',
    }
  }),
} satisfies Meta<typeof ExampleMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    label: 'Edit',
  },
};
