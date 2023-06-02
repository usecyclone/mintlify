import { Inter, Fira_Code } from '@next/font/google';
import type { Preview } from '@storybook/react';
import React from 'react';

import '../src/css/bar-of-progress.css';
import '../src/css/base.css';
import '../src/css/components.css';
import '../src/css/main.css';
import '../src/css/prism.css';
import '../src/css/utilities.css';
import { ColorVariables } from '../src/ui/ColorVariables';

const inter = Inter({
  display: 'block',
  subsets: ['latin'],
  variable: '--font-inter',
});
const firaCode = Fira_Code({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-fira-code',
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <div>
        <style>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
        <div
          className={`antialiased relative antialiased text-gray-500 dark:text-gray-400 ${inter.variable} ${firaCode.variable}`}
        >
          <ColorVariables />
          <Story />
        </div>
      </div>
    ),
  ],
};

export default preview;
