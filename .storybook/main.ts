import type { StorybookConfig } from '@storybook/react-vite';
import { withoutVitePlugins } from '@storybook/builder-vite';

const config: StorybookConfig = {
  "stories": [
    "./stories/**/*.mdx",
    "./stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": ["@storybook/addon-docs"],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  "viteFinal": async (config) => ({
    ...config,
    plugins: await withoutVitePlugins(config.plugins, [
      'vite:dts',
    ]),
  }),
};

export default config;
