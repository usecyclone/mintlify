import { Tab, Tabs } from '@mintlify/components';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { Expandable } from '@/components/Expandable';
import { ResponseField } from '@/components/ResponseField';
import OneOf from '@/layouts/OpenApiFields/ExpandableFields/OneOf';
import { combineAllOfIntoObject, foldAllOfIntoSchema, getTypeName } from '@/openapi';

import { MarkdownComponents } from '../index';

export default function ExpandableFields({ schema }: any) {
  const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>({});
  if (schema == null) {
    return null;
  }
  if (schema.allOf) {
    schema = foldAllOfIntoSchema(schema);
  }
  if (schema.anyOf != null) {
    return (
      <Tabs>
        {schema.anyOf.map((schema: any, i: number) => {
          let child = schema;
          if (schema?.properties == null) {
            child = { properties: schema };
          }
          return (
            <Tab key={i} title={`Option ${i + 1}`}>
              <ExpandableFields schema={child} />
            </Tab>
          );
        })}
      </Tabs>
    );
  }
  if (schema.oneOf != null) {
    return (
      <Tabs>
        {schema.oneOf.map((schema: any, i: number) => {
          let child = schema;
          if (schema?.properties == null) {
            child = { properties: schema };
          }
          return (
            <Tab key={i} title={`Option ${i + 1}`}>
              <ExpandableFields schema={child} />
            </Tab>
          );
        })}
      </Tabs>
    );
  }

  if (schema.items) {
    const name = schema.items.title;
    return (
      // TODO: Check if schema.items.type is needed
      <ResponseField name={name} type={schema.type ?? schema.items.type} default={schema.default}>
        <>
          <ReactMarkdown components={MarkdownComponents}>{schema.description}</ReactMarkdown>
          <Expandable
            title="properties"
            defaultOpen={false}
            onChange={(open) => {
              setExpandedFields({ ...expandedFields, [name]: open });
              return;
            }}
          >
            <ExpandableFields schema={schema.items} />
          </Expandable>
        </>
      </ResponseField>
    );
  }

  const propertiesEntries = schema.properties && Object.entries(schema.properties);

  // TBD: Cleanup response field by types
  return (
    <>
      {propertiesEntries?.map(([property, value]: any, i: number) => {
        if (value == null) {
          return null;
        }
        if (value.allOf) {
          value = foldAllOfIntoSchema(value);
        }
        const isArrayExpandable = Boolean(value.items && value.items.properties == null);
        const type =
          isArrayExpandable && value.items.type ? `${value.items.type}[]` : getTypeName(value.type);
        return (
          <ResponseField
            key={`${property}-${value}-${i}`}
            name={property}
            required={schema.required?.includes(property)}
            type={type}
            default={value.default}
          >
            {/* Is array nested */}
            {value.items && !isArrayExpandable ? (
              <div className="mt-2">
                <ReactMarkdown components={MarkdownComponents}>{value.description}</ReactMarkdown>
                <Expandable
                  title={value.items.type || 'properties'}
                  onChange={(open) => {
                    setExpandedFields({ ...expandedFields, [property]: open });
                    return;
                  }}
                >
                  <ExpandableFields schema={value.items} />
                </Expandable>
              </div>
            ) : (
              <>
                <ReactMarkdown components={MarkdownComponents}>
                  {value.description || value.title || getEnumDescription(value.enum)}
                </ReactMarkdown>
                {value.properties && (
                  <div className="mt-2">
                    <Expandable
                      title={value.type || 'properties'}
                      onChange={(open) => {
                        setExpandedFields({ ...expandedFields, [property]: open });
                        return;
                      }}
                    >
                      <ExpandableFields schema={value}></ExpandableFields>
                    </Expandable>
                  </div>
                )}
                {value.items?.allOf && (
                  <Expandable title="properties">
                    <ExpandableFields
                      schema={combineAllOfIntoObject(value.items.allOf)}
                    ></ExpandableFields>
                  </Expandable>
                )}
                {value.enum && Array.isArray(value.enum) && (
                  <div className="whitespace-pre-wrap">
                    Available options:{' '}
                    {value.enum.map((enumValue: string, i: number) => (
                      <div key={`${enumValue}-${i}`} className="inline-block">
                        <code>{enumValue}</code>
                        {i !== value.enum.length - 1 && ','}{' '}
                      </div>
                    ))}
                  </div>
                )}
                {/* TODO: Support oneOf primitive types */}
                {value.oneOf &&
                  Array.isArray(value.oneOf) &&
                  value.oneOf.every(
                    (schema: unknown) =>
                      typeof schema === 'object' &&
                      (schema as Record<string, unknown>)?.type === 'object'
                  ) && <OneOf oneOfOptions={value.oneOf} />}
                {value?.items?.oneOf && Array.isArray(value.items.oneOf) && (
                  <OneOf oneOfOptions={value.items.oneOf} />
                )}
              </>
            )}
          </ResponseField>
        );
      })}
    </>
  );
}

const getEnumDescription = (enumArray?: string[]): React.ReactNode | null => {
  if (enumArray == null || enumArray.length === 0) {
    return null;
  }
  return (
    <>
      Allowed values:{' '}
      {enumArray.map((val, i) => (
        <div key={`${val}-${i}`}>
          <code>{val}</code>
          {i !== enumArray.length - 1 && ', '}
        </div>
      ))}
    </>
  );
};
