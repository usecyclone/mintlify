import { renderHook } from '@testing-library/react';
import { ReactNode } from 'react';

import { ConfigContext, ConfigContextType } from '@/context/ConfigContext';
import { Component } from '@/enums/components';
import {
  ParamGroupsOptionsType,
  useInitialParamGroups,
} from '@/hooks/useMDXContentController/useMDXContentCallbacks/useInitialParamGroups';

const jsonComponent = {
  children: [
    {
      filename: 'json',
      html: '<span>JSON</span>',
      children: [],
    },
  ],
  contentType: 'application/json',
  type: Component.ParamField,
  group: 'json',
  attributes: [
    {
      type: 'string',
      value: 'json',
      name: 'body',
    },
  ],
};

const formComponent = {
  children: [
    {
      filename: 'form',
      html: '<span>FORM</span>',
      children: [],
    },
  ],
  group: 'form',
  contentType: 'multipart/form-data',
  type: Component.Param,
  attributes: [
    {
      type: 'string',
      value: 'form',
      name: 'body',
    },
  ],
};

const apiComponents = [jsonComponent, formComponent];

const initialProps: ParamGroupsOptionsType = {
  pageMetadata: {
    api: 'test',
  },
  apiComponents,
  selectedBodyContentType: 'application/json',
  openApiPlaygroundProps: {
    api: 'test',
    apiComponentsByContentType: [
      {
        contentType: 'application/json',
        apiComponents: [jsonComponent],
      },
      {
        contentType: 'multipart/form-data',
        apiComponents: [formComponent],
      },
    ],
  },
};
const method = 'Bearer';
jest.mock('is-absolute-url', () => ({}));
const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigContext.Provider
      value={
        {
          mintConfig: {
            api: {
              auth: {
                name: 'test',
                method,
              },
            },
          },
        } as ConfigContextType
      }
    >
      {children}
    </ConfigContext.Provider>
  );
};

const initialExpectedResult = {
  paramGroupDict: {
    Authorization: [
      {
        name: method,
        required: true,
      },
    ],
    Body: [
      {
        enum: undefined,
        example: undefined,
        group: 'body',
        items: undefined,
        name: 'json',
        oneOf: undefined,
        placeholder: undefined,
        properties: undefined,
        required: false,
        type: undefined,
      },
    ],
  },
  paramGroups: [
    {
      name: 'Authorization',
      params: [
        {
          name: 'Bearer',
          required: true,
        },
      ],
    },
    {
      name: 'Body',
      params: [
        {
          enum: undefined,
          example: undefined,
          group: 'body',
          items: undefined,
          name: 'json',
          oneOf: undefined,
          placeholder: undefined,
          properties: undefined,
          required: false,
          type: undefined,
        },
      ],
    },
  ],
};

describe('useParamGroups hook unit tests', () => {
  it('should return param groups', () => {
    const expectedResult = initialExpectedResult;

    const { result } = renderHook((params) => useInitialParamGroups(params), {
      wrapper,
      initialProps,
    });

    expect(result.current).toStrictEqual(expectedResult);
  });

  it('should rerender after changing apiComponents and return paramGroups', () => {
    const expectedResult = {
      paramGroupDict: {
        Authorization: [
          {
            name: method,
            required: true,
          },
        ],
        Body: [
          {
            enum: undefined,
            example: undefined,
            group: formComponent.attributes[0].name,
            items: undefined,
            name: formComponent.attributes[0].value,
            oneOf: undefined,
            placeholder: undefined,
            properties: undefined,
            required: false,
            type: undefined,
          },
        ],
      },
      paramGroups: [
        {
          name: 'Authorization',
          params: [
            {
              name: method,
              required: true,
            },
          ],
        },
        {
          name:
            formComponent.attributes[0].name.charAt(0).toUpperCase() +
            formComponent.attributes[0].name.slice(1),
          params: [
            {
              enum: undefined,
              example: undefined,
              group: formComponent.attributes[0].name,
              items: undefined,
              name: formComponent.attributes[0].value,
              oneOf: undefined,
              placeholder: undefined,
              properties: undefined,
              required: false,
              type: undefined,
            },
          ],
        },
      ],
    };

    const { result, rerender } = renderHook((params) => useInitialParamGroups(params), {
      wrapper,
      initialProps,
    });
    const initialResult = { ...result.current };
    rerender({
      ...initialProps,
      selectedBodyContentType: 'multipart/form-data',
    });

    expect(initialResult).toStrictEqual(initialExpectedResult);
    expect(result.current).toStrictEqual(expectedResult);
  });
});
