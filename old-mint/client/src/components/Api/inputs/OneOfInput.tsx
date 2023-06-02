import React, { useState } from 'react';

import { Param } from '@/utils/api';

import { ApiInputValue } from '../types';
import { ApiInput } from './ApiInput';
import { InputDropdown } from './InputDropdown';
import ObjectInput from './ObjectInput';

const OneOfInput = ({
  name,
  required,
  oneOfOptions,
  onChangeParam,
  onDeleteArrayItem,
  parentInputs = [],
}: {
  name: string;
  required: boolean;
  oneOfOptions: { title: string; params: Param[] }[];
  onChangeParam: (parentInputs: string[], paramName: string, value: ApiInputValue) => void;
  onDeleteArrayItem?: () => void;
  parentInputs?: string[];
}) => {
  const optionTitles = oneOfOptions.map((option, i) => option.title ?? i.toString());
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [value, setValues] = useState<Record<string, ApiInputValue>>({});
  const [isExpandedProperties, setIsExpandedProperties] = useState(required);
  const onOptionChange = (optionTitle: string) => {
    setSelectedOptionIndex(optionTitles.indexOf(optionTitle));
    setValues({});
    onChangeParam(parentInputs, name, {});
  };
  const onInputChange = (_: string[], paramName: string, paramValue: ApiInputValue) => {
    setValues((prev) => ({ ...prev, [paramName]: paramValue }));
    onChangeParam(parentInputs, name, value);
  };
  return (
    <div className="text-[0.84rem] px-3 py-2 -mx-1.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-codeblock rounded-md">
      <div className="flex items-center space-x-2 group">
        <div className="flex items-center flex-1 font-mono text-gray-600 dark:text-gray-300">
          {name}
          {required && <span className="text-red-600 dark:text-red-400">*</span>}
        </div>
        <div className="flex-initial w-2/5 sm:w-1/3">
          <ObjectInput
            isExpandedProperties={isExpandedProperties}
            onClick={() => setIsExpandedProperties(!isExpandedProperties)}
          />
        </div>
      </div>
      {isExpandedProperties && (
        <div className="mt-1 pt-2 pb-1 space-y-2">
          <div className="text-[0.84rem] font-mono text-gray-600 dark:text-gray-300">
            <InputDropdown
              options={optionTitles}
              value={optionTitles[selectedOptionIndex]}
              onInputChange={onOptionChange}
            />
          </div>
          {oneOfOptions[selectedOptionIndex].params.map((param, i) => (
            <ApiInput
              key={`${param.name}${i}`}
              param={param}
              value={value?.[param.name] ?? ''}
              onChangeParam={onInputChange}
              onDeleteArrayItem={onDeleteArrayItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OneOfInput;
