import type { Meta, StoryObj } from '@storybook/react';
import { v3_1Specs } from 'test/factories/schemas';

import { ConfigContext } from '@/context/ConfigContext';
import { MDXContentContext } from '@/context/MDXContentContext';
import { ApiPlayground } from '@/ui/ApiPlayground';

import { createApiPlaygroundContextFromSpec } from '../test/factories/openApi';

const meta: Meta<typeof ApiPlayground> = {
  title: 'API Reference/API Playground',
  component: ApiPlayground,
};

export default meta;
type Story = StoryObj<typeof ApiPlayground>;

const { initConfigContext, initMDXContentContext } = createApiPlaygroundContextFromSpec(
  v3_1Specs.complexRequestObject
);

const authorizationContext = {
  ...initMDXContentContext,
  paramGroups: initMDXContentContext.paramGroups.filter(({ name }) => name === 'Authorization'),
};
export const ComplexRequestV3_1Authorization: Story = {
  name: 'Complex Request (OpenAPI 3.1) - Authorization',
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={initConfigContext}>
        <MDXContentContext.Provider value={[authorizationContext, () => {}]}>
          <Story />
        </MDXContentContext.Provider>
      </ConfigContext.Provider>
    ),
  ],
};

const headerContext = {
  ...initMDXContentContext,
  paramGroups: initMDXContentContext.paramGroups.filter(({ name }) => name === 'Header'),
};
export const ComplexRequestV3_1Headers: Story = {
  name: 'Complex Request (OpenAPI 3.1) - Headers',
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={initConfigContext}>
        <MDXContentContext.Provider value={[headerContext, () => {}]}>
          <Story />
        </MDXContentContext.Provider>
      </ConfigContext.Provider>
    ),
  ],
};

const bodyContext = {
  ...initMDXContentContext,
  paramGroups: initMDXContentContext.paramGroups.filter(({ name }) => name === 'Body'),
};
export const ComplexRequestV3_1Body: Story = {
  name: 'Complex Request (OpenAPI 3.1) - Body',
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={initConfigContext}>
        <MDXContentContext.Provider value={[bodyContext, () => {}]}>
          <Story />
        </MDXContentContext.Provider>
      </ConfigContext.Provider>
    ),
  ],
};
