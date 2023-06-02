import type { Meta, StoryObj } from '@storybook/react';
import { v2Specs, v3Specs, v3_1Specs } from 'test/factories/schemas';

import { ConfigContext } from '@/context/ConfigContext';

import { GeneratedRequestExamples } from '../src/layouts/ApiSupplemental';
import {
  createGeneratedRequestExamplesParamsFromSpec,
  generateGeneratedRequestExamplesArgs,
} from '../test/factories/openApi';

const meta: Meta<typeof GeneratedRequestExamples> = {
  title: 'API Reference/Generated Request Examples',
  component: GeneratedRequestExamples,
};

export default meta;
type Story = StoryObj<typeof GeneratedRequestExamples>;

const { args, configContext } = generateGeneratedRequestExamplesArgs({
  path: '/api/list/{uuid}',
  method: 'POST',
  requestType: 'object',
  security: [
    {
      name: 'X-Access-Key',
      type: 'apiKey',
    },
    {
      name: 'Credentials',
      type: 'basic',
    },
  ],
  securityType: 'local',
});

export const Primary: Story = {
  args,
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={configContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

// TODO(ronan): fix swagger 2.0 request
const { args: complexRequestObjectV2Args, configContext: complexRequestObjectV2ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v2Specs.complexRequestObject);
export const ComplexRequestV2: Story = {
  name: 'Complex Request (OpenAPI 2.0)',
  args: complexRequestObjectV2Args,
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={complexRequestObjectV2ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

const { args: complexResponseObjectV2Args, configContext: complexResponseObjectV2ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v2Specs.complexResponseObject);
export const ComplexResponseV2: Story = {
  name: 'Complex Response (OpenAPI 2.0)',
  args: complexResponseObjectV2Args,
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={complexResponseObjectV2ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

const { args: globalSecurityV2Args, configContext: globalSecurityV2ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v2Specs.globalSecurity);
export const GlobalSecurityV2: Story = {
  name: 'Global Security (OpenAPI 2.0)',
  args: globalSecurityV2Args,
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={globalSecurityV2ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

const { args: localSecurityV2Args, configContext: localSecurityV2ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v2Specs.localSecurity);
export const LocalSecurityV2: Story = {
  name: 'Local Security (OpenAPI 2.0)',
  args: localSecurityV2Args,
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={localSecurityV2ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

// TODO(ronan): fix openapi 3.0 request
const { args: complexRequestObjectV3Args, configContext: complexRequestObjectV3ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v3Specs.complexRequestObject);
export const ComplexRequestV3: Story = {
  name: 'Complex Request (OpenAPI 3.0)',
  args: complexRequestObjectV3Args,
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={complexRequestObjectV3ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

const { args: complexResponseObjectV3Args, configContext: complexResponseObjectV3ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v3Specs.complexResponseObject);
export const ComplexResponseV3: Story = {
  name: 'Complex Response (OpenAPI 3.0)',
  args: complexResponseObjectV3Args,
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={complexResponseObjectV3ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

// TODO(ronan): fix openapi 3.0 non-header security types
const { args: globalSecurityV3Args, configContext: globalSecurityV3ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v3Specs.globalSecurity);
export const GlobalSecurityV3: Story = {
  name: 'Global Security (OpenAPI 3.0)',
  args: globalSecurityV3Args,
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={globalSecurityV3ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

// TODO(ronan): fix openapi 3.0 non-header security types
const { args: localSecurityV3Args, configContext: localSecurityV3ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v3Specs.localSecurity);
export const LocalSecurityV3: Story = {
  name: 'Local Security (OpenAPI 3.0)',
  args: localSecurityV3Args,
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={localSecurityV3ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

const { args: complexRequestObjectV3_1Args, configContext: complexRequestObjectV3_1ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v3_1Specs.complexRequestObject);
export const ComplexRequestV3_1: Story = {
  name: 'Complex Request (OpenAPI 3.1)',
  args: complexRequestObjectV3_1Args,
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={complexRequestObjectV3_1ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

const {
  args: complexResponseObjectV3_1Args,
  configContext: complexResponseObjectV3_1ConfigContext,
} = createGeneratedRequestExamplesParamsFromSpec(v3_1Specs.complexResponseObject);
export const ComplexResponseV3_1: Story = {
  name: 'Complex Response (OpenAPI 3.1)',
  args: complexResponseObjectV3_1Args,
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={complexResponseObjectV3_1ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

const { args: globalSecurityV3_1Args, configContext: globalSecurityV3_1ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v3_1Specs.globalSecurity);
export const GlobalSecurityV3_1: Story = {
  name: 'Global Security (OpenAPI 3.1)',
  args: globalSecurityV3_1Args,
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={globalSecurityV3_1ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

const { args: localSecurityV3_1Args, configContext: localSecurityV3_1ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v3_1Specs.localSecurity);
export const LocalSecurityV3_1: Story = {
  name: 'Local Security (OpenAPI 3.1)',
  args: localSecurityV3_1Args,
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={localSecurityV3_1ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};
