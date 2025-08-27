import { args, Props, Meta } from '../../../.storybook/utils';
import ExampleMenuBar from './MenuBar.example';
import source from './MenuBar.example.tsx?raw';

export const Example = ExampleMenuBar;
type TArgs = Props<typeof Example>;

export default {
  title: 'Components/Win32MenuBar',
  component: Example,
  parameters: {
    layout: 'padded',
    docs: {
      source: { code: source },
    },
    controls: {
      exclude: ['children'],
    },
  },
  ...args<TArgs>({
    children: {
      description: 'RootMenu components.',
      control: false,
    },
    className: {
      description: 'Add a class to the component.',
      control: 'text',
    },
    style: {
      description: 'The style config object. See "Full Menu Bar" example for usage.', 
      type: 'Win32MenuStyleProps',
      control: 'object',
    },
    styleOverride: {
      description: 'The style config object. See "CSS Variables" example for usage.', 
      type: 'Win32MenuCSSVars & CSSProperties',
      control: 'object',
    },
    onSelect: {
      description: 'The menu item handler when the `onSelect` argument is not directly provided to the `MenuItem` component.', 
      type: '(menuId: string) => void',
      control: false,
    },
    expandIcon: {
      description: 'The icon used to indicate a submenu.', 
      type: 'string | ReactNode',
      control: 'text',
      defaultValue: "❯",
    },
    checkedIcon: {
      description: 'The icon used to indicate a submenu.', 
      type: 'string | ReactNode',
      control: 'text',
      defaultValue: "✔",
    },
    hotKeysEnabled: {
      description: 'Enable hotkeys for the entire menu bar.', 
      type: 'boolean',
      control: 'boolean',
      defaultValue: true,
    },
    disabled: {
      description: 'Disable the entire menu bar.', 
      type: 'boolean',
      control: 'boolean',
      defaultValue: false,
    },
  }),
} satisfies Meta<typeof Example>;
