import { clsx } from 'clsx';
import React, { useState } from 'react';

import { Param } from '@/utils/api';

import { ApiInputValue } from '../types';
import { AddArrayItemButton } from './AddArrayItemButton';
import BooleanInput from './BooleanInput';
import DefaultInput from './DefaultInput';
import FileInput from './FileInput';
import { InputDropdown } from './InputDropdown';
import ObjectInput from './ObjectInput';
import OneOfInput from './OneOfInput';

/**
 *  ApiInput provides a UI to receive inputs from the user for API calls.
 *  The user is responsible for updating value when onChangeParam is called.
 *  ApiInput doesn't store the value internally so components don't work
 *  when the user doesn't track the state.
 */
export function ApiInput({
  param,
  value,
  onChangeParam,
  onDeleteArrayItem,
  parentInputs = [],
}: {
  param: Param;
  value: ApiInputValue;
  onChangeParam: (parentInputs: string[], paramName: string, value: ApiInputValue) => void;
  onDeleteArrayItem?: () => void;
  parentInputs?: string[];
}) {
  const isMultiFile =
    param.type === 'array' && param?.items?.type === 'string' && param?.items?.format === 'binary';
  const isObject = param.type === 'object' && param.properties != null;
  const isArray = param.type === 'array' && !isMultiFile;

  const [isExpandedProperties, setIsExpandedProperties] = useState(
    Boolean(param.required) && isObject
  );

  const [object, setObject] = useState<Record<string, any>>(isObject ? (value as any) : {});
  const [array, setArray] = useState<ApiInputValue[]>(
    isArray && Array.isArray(value) ? (value as ApiInputValue[]) : []
  );

  if (param?.oneOf) {
    return (
      <OneOfInput
        name={param.name}
        required={param.required ?? false}
        oneOfOptions={param.oneOf}
        onChangeParam={onChangeParam}
        parentInputs={parentInputs}
        onDeleteArrayItem={onDeleteArrayItem}
      />
    );
  }
  let InputField;

  // TO DO: Support multiple types
  let lowerCaseParamType;
  if (typeof param.type === 'string') {
    lowerCaseParamType = param.type?.toLowerCase();
  }

  const onInputChange = (value: any) => {
    onChangeParam(parentInputs, param.name, value);
  };

  const onObjectParentChange = (property: string, value: any) => {
    const newObj = { ...object, [property]: value };
    setObject(newObj);
    onInputChange(newObj);
  };

  const onArrayParentChange = (arrayIndex: number, value: any) => {
    const newArray = array.map((item, i) => {
      if (arrayIndex === i) {
        return value;
      }
      return item;
    });
    setArray(newArray);
    onInputChange(newArray);
  };

  const onAddArrayItem = () => {
    const newArray = [...array, param.properties ? {} : null];
    setArray(newArray);
    onInputChange(newArray);
  };

  const onUpdateArray = (newArray: any) => {
    setArray(newArray);
    const inputValue = newArray.length > 0 ? newArray : undefined;
    onInputChange(inputValue?.map((item: any) => item.value));
  };
  const isMultiFileParamType = isMultiFile || lowerCaseParamType == 'files';
  if (lowerCaseParamType === 'boolean') {
    InputField = <BooleanInput value={value} onInputChange={onInputChange} />;
  } else if (lowerCaseParamType === 'integer' || lowerCaseParamType === 'number') {
    InputField = (
      <DefaultInput
        placeholder={param.placeholder}
        value={value as never}
        onChange={(e) => onInputChange(parseFloat(e.target.value))}
        type={'number'}
      />
    );
  } else if (lowerCaseParamType === 'file' || isMultiFileParamType) {
    InputField = (
      <FileInput
        isMultiFile={isMultiFileParamType}
        value={value as never}
        onInputChange={onInputChange}
      />
    );
  } else if (isObject && !isArray) {
    InputField = (
      <ObjectInput
        isExpandedProperties={isExpandedProperties}
        onClick={() => setIsExpandedProperties(!isExpandedProperties)}
      />
    );
  } else if (isArray) {
    if (array.length === 0) {
      InputField = <AddArrayItemButton onClick={onAddArrayItem} />;
    } else {
      InputField = null;
    }
  } else if (param.enum) {
    InputField = (
      <InputDropdown options={param.enum} value={value as string} onInputChange={onInputChange} />
    );
  } else {
    InputField = (
      <DefaultInput
        placeholder={param.placeholder}
        value={value as never}
        onChange={(e) => onInputChange(e.target.value)}
        type={'text'}
      />
    );
  }

  return (
    <div
      className={clsx(
        'text-[0.84rem]',
        ((isObject && isExpandedProperties) || array.length > 0) &&
          'px-3 py-2 -mx-1.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-codeblock rounded-md'
      )}
    >
      <div className="flex items-center space-x-2 group">
        <div
          className={clsx(
            'flex items-center flex-1 font-mono text-gray-600 dark:text-gray-300',
            isObject && 'cursor-pointer',
            onDeleteArrayItem && 'invisible' // Array items don't have parameter names
          )}
          onClick={() => isObject && setIsExpandedProperties(!isExpandedProperties)}
        >
          {param.name}
          {param.required && <span className="text-red-600 dark:text-red-400">*</span>}
        </div>
        <div
          className={clsx(
            'flex-initial',
            onDeleteArrayItem ? 'w-[calc(40%-1.05rem)] sm:w-[calc(33%-1.05rem)]' : 'w-2/5 sm:w-1/3'
          )}
        >
          {InputField}
        </div>
        {onDeleteArrayItem && (
          <button
            className="py-1 fill-red-600 dark:fill-red-400 hover:fill-red-800 dark:hover:fill-red-200"
            onClick={onDeleteArrayItem}
          >
            <svg className="h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M424 80C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H412.4L388.4 452.7C385.9 486.1 358.1 512 324.6 512H123.4C89.92 512 62.09 486.1 59.61 452.7L35.56 128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94L354.2 80H424zM177.1 48C174.5 48 171.1 49.34 170.5 51.56L151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1zM364.3 128H83.69L107.5 449.2C108.1 457.5 115.1 464 123.4 464H324.6C332.9 464 339.9 457.5 340.5 449.2L364.3 128z" />
            </svg>
          </button>
        )}
      </div>
      {/* Properties extension */}
      {isExpandedProperties && param.properties && (
        <div className="mt-1 pt-2 pb-1 border-t border-gray-100 dark:border-gray-700 space-y-2">
          {param.properties.map((property) => (
            <ApiInput
              key={property.name}
              param={property}
              value={((value as any) || {})[property.name]}
              onChangeParam={(_: string[], __: string, paramValue: ApiInputValue) =>
                onObjectParentChange(property.name, paramValue)
              }
              parentInputs={[...parentInputs, param.name]}
            />
          ))}
        </div>
      )}
      {/* Array extension */}
      {array.length > 0 && (
        <div
          className={clsx(
            'mt-1 pt-2 pb-1 space-y-2',
            !isObject && 'border-t border-gray-100 dark:border-gray-700'
          )}
        >
          {array.map((item, i) => (
            <ApiInput
              key={`${param.name}${i}`}
              param={{ ...param, type: param.properties ? 'object' : getArrayType(param.type) }}
              value={item}
              onChangeParam={(_: string[], __: string, paramValue: ApiInputValue) =>
                onArrayParentChange(i, paramValue)
              }
              onDeleteArrayItem={() => onUpdateArray(array.filter((_, j) => i !== j))}
            />
          ))}
          <div className="flex items-center justify-end space-x-2 group">
            <div className="flex-initial w-2/5 sm:w-1/3">
              <AddArrayItemButton onClick={onAddArrayItem} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const getArrayType = (type: string | undefined) => {
  if (!type || type === 'array') {
    return '';
  }
  return type.replace(/\[\]/g, '');
};
