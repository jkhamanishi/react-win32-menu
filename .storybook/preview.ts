import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Getting Started',
          'Examples', ['Full Menu Bar', '*'],
          'Components',
          'Types',
        ],
      },
    },
    docs: {
      codePanel: true,
    },
  },
};

export default preview;