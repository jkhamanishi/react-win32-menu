import { args, Props, Meta } from '../../../utils';
import ExampleMenu from './Separator.example';
import source from './Separator.example.tsx?raw';


type TArgs = Props<typeof ExampleMenu>;

export default {
  title: 'Components/Separator',
  component: ExampleMenu,
  parameters: {
    layout: 'padded',
    docs: { source: { code: source } },
  },
  ...args<TArgs>({
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
} satisfies Meta<typeof ExampleMenu>;

export const Example = ExampleMenu;
