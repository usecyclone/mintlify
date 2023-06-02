import type { Meta, StoryObj } from '@storybook/react';
import { v2Specs, v3Specs, v3_1Specs } from 'test/factories/schemas';

import { ConfigContext } from '@/context/ConfigContext';
import OpenApiFields from '@/layouts/OpenApiFields';
import { Content } from '@/ui/MDXContentController/Content';

import { createGeneratedRequestExamplesParamsFromSpec } from '../test/factories/openApi';

const meta: Meta<typeof OpenApiFields> = {
  title: 'API Reference/API Fields',
  component: OpenApiFields,
  decorators: [
    (Story) => (
      <Content>
        <Story />
      </Content>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OpenApiFields>;

// TODO(ronan): fix swagger 2.0 request
const { configContext: complexRequestObjectV2ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v2Specs.complexRequestObject);
export const ComplexRequestV2: Story = {
  name: 'Complex Request (OpenAPI 2.0)',
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={complexRequestObjectV2ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

// TODO(ronan): swagger 2.0 causing error
const { configContext: complexResponseObjectV2ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v2Specs.complexResponseObject);
export const ComplexResponseV2: Story = {
  name: 'Complex Response (OpenAPI 2.0)',
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={complexResponseObjectV2ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

// TODO(ronan): security not showing up
const { configContext: globalSecurityV2ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v2Specs.globalSecurity);
export const GlobalSecurityV2: Story = {
  name: 'Global Security (OpenAPI 2.0)',
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={globalSecurityV2ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

// TODO(ronan): security not showing up
const { configContext: localSecurityV2ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v2Specs.localSecurity);
export const LocalSecurityV2: Story = {
  name: 'Local Security (OpenAPI 2.0)',
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={localSecurityV2ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

const { configContext: complexRequestObjectV3ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v3Specs.complexRequestObject);
export const ComplexRequestV3: Story = {
  name: 'Complex Request (OpenAPI 3.0)',
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={complexRequestObjectV3ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

const { configContext: complexResponseObjectV3ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v3Specs.complexResponseObject);
export const ComplexResponseV3: Story = {
  name: 'Complex Response (OpenAPI 3.0)',
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={complexResponseObjectV3ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

// TODO(ronan): security not showing up
const { configContext: globalSecurityV3ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v3Specs.globalSecurity);
export const GlobalSecurityV3: Story = {
  name: 'Global Security (OpenAPI 3.0)',
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={globalSecurityV3ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

// TODO(ronan): security not showing up
const { configContext: localSecurityV3ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v3Specs.localSecurity);
export const LocalSecurityV3: Story = {
  name: 'Local Security (OpenAPI 3.0)',
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={localSecurityV3ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

const { configContext: oneOfConfigContext } = createGeneratedRequestExamplesParamsFromSpec(
  v3Specs.oneOf
);
export const OneOfV3: Story = {
  name: 'oneOf Composition (OpenAPI 3.0)',
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={oneOfConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

// TODO(ronan): not handling string-type response object
const { configContext: complexRequestObjectV3_1ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v3_1Specs.complexRequestObject);
export const ComplexRequestV3_1: Story = {
  name: 'Complex Request (OpenAPI 3.1)',
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={complexRequestObjectV3_1ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

const { configContext: complexResponseObjectV3_1ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v3_1Specs.complexResponseObject);
export const ComplexResponseV3_1: Story = {
  name: 'Complex Response (OpenAPI 3.1)',
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={complexResponseObjectV3_1ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

// TODO(ronan): security not showing up
const { configContext: globalSecurityV3_1ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v3_1Specs.globalSecurity);
export const GlobalSecurityV3_1: Story = {
  name: 'Global Security (OpenAPI 3.1)',
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={globalSecurityV3_1ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};

// TODO(ronan): security not showing up
const { configContext: localSecurityV3_1ConfigContext } =
  createGeneratedRequestExamplesParamsFromSpec(v3_1Specs.localSecurity);
export const LocalSecurityV3_1: Story = {
  name: 'Local Security (OpenAPI 3.1)',
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={localSecurityV3_1ConfigContext}>
        <Story />
      </ConfigContext.Provider>
    ),
  ],
};
