import clsx from 'clsx';
import { useMemo } from 'react';

const MAX_DEFAULT_VALUE_LENGTH = 50;

export type ParamProps = {
  query?: string;
  path?: string;
  body?: string;
  header?: string;
  children: any;
  default?: string;
  type?: string;
  location?: string;
  required?: boolean;
  optional?: boolean;
  hidden?: boolean;
  // Used to flow data to the API Playground
  last?: boolean;
  placeholder?: any;
  enum?: string[];
};

// 9/8/2022 - Migrate everyone off Param
export function Param(props: ParamProps) {
  return <ParamField {...props} />;
}

// Also props: query, body, path
export function ParamField({
  query,
  path,
  body,
  header,
  children,
  default: defaultValue,
  type,
  location,
  required = false,
  optional = false,
  hidden = false,
  // Do not delete. Used to flow data to the API Playground
  last,
  placeholder,
  enum: enumValues,
}: ParamProps) {
  const name = query || path || body || header;

  if (name == null) {
    return null;
  }

  return (
    <GenericParam
      name={name!}
      defaultValue={defaultValue}
      type={type}
      location={location}
      required={required}
      optional={optional}
      hidden={hidden}
    >
      {children}
    </GenericParam>
  );
}

// TODO: Remove from components
export type GenericParamProps = {
  name: string;
  type?: string;
  location?: string;
  defaultValue?: string;
  required?: boolean;
  optional?: boolean;
  hidden?: boolean;
  children: React.ReactNode;
};

export function GenericParam({
  name,
  type,
  location,
  defaultValue,
  required = false,
  optional = false,
  hidden = false,
  children,
}: GenericParamProps) {
  const stringifiedDefaultValue = useMemo(() => {
    if (typeof defaultValue === 'object' && defaultValue != null) {
      // don't display values with nested objects; looks bad on one line
      const containsNestedObject = Object.values(defaultValue).some(
        (value) => typeof value === 'object'
      );
      if (containsNestedObject) {
        return null;
      }
    }

    const stringifiedValue = JSON.stringify(defaultValue);
    if (stringifiedValue?.length > 0 && stringifiedValue?.length < MAX_DEFAULT_VALUE_LENGTH) {
      return stringifiedValue;
    }
    return null;
  }, [defaultValue]);

  if (hidden) {
    return null;
  }

  return (
    <div className="pb-5 mb-5 border-gray-100 dark:border-gray-800 border-b">
      <div className="flex font-mono text-sm">
        {name && (
          <div className="py-0.5 flex-1 space-x-2.5 truncate">
            <span className={clsx('rounded-md font-semibold text-primary dark:text-primary-light')}>
              {name}
            </span>
            {location && (
              <span className="text-gray-500 dark:text-gray-300">{`[${location}]`}</span>
            )}
            {required && <span className="text-gray-500 dark:text-gray-300">required</span>}
            {optional && <span className="text-gray-500 dark:text-gray-300">optional</span>}
            {stringifiedDefaultValue && (
              <span className="text-gray-500 dark:text-gray-300">
                Default: {stringifiedDefaultValue}
              </span>
            )}
          </div>
        )}
        {type && <div className="text-gray-600 dark:text-gray-300">{type}</div>}
      </div>
      <div className="mt-3 prose-sm prose-gray dark:prose-dark">{children}</div>
    </div>
  );
}
