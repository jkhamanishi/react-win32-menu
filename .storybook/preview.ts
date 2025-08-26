import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Getting Started',
          'Examples', ['Full Menu Bar', '*'],
          'Components'
        ],
      },
    },
  },
};

export default preview;