import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { Win32MenuBar, MenuItem, RootMenu, SubMenu } from "../../../src";


export function Example() {
  return (
    <Win32MenuBar>
      <RootMenu label="label">
        <MenuItem label="label" />
        <MenuItem label="label" />
        <SubMenu label="label">
          <MenuItem label="label" />
          <MenuItem label="label" />
          <MenuItem label="label" />
        </SubMenu>
      </RootMenu>
      <RootMenu label="label">
        <MenuItem label="label" />
        <MenuItem label="label" />
        <SubMenu label="label">
          <MenuItem label="label" />
          <MenuItem label="label" />
          <MenuItem label="label" />
        </SubMenu>
      </RootMenu>
    </Win32MenuBar>
  );
}

export default {
  title: 'Examples/Full Menu Bar',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Example>;
