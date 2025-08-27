import type { Meta } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Win32MenuBar, RootMenu } from "..";


export function Example() {
  return (
    <Win32MenuBar>
      <RootMenu label="Menu 1" />
      <RootMenu label="Menu 2" />
      <RootMenu label="Menu 3" />
    </Win32MenuBar>
  );
}

export default {
  title: 'Components/Win32MenuBar',
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Example>;