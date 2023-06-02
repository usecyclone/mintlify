import { ChangeEvent, useCallback } from 'react';

import { useSetSelectedBodyContentType } from '@/hooks/useMDXContentController/useSetSelectedBodyContentType';

import { BaseUrlDropdown } from './BaseUrlDropdown';
import { RequestMethodBubble } from './RequestMethodBubble';
import { RequestMethods } from './types';

export const RequestPathHeader = ({
  method,
  path,
  baseUrls,
  defaultBaseUrl,
  onBaseUrlChange,
  contentTypeOptions,
}: {
  method: RequestMethods;
  path: string;
  baseUrls?: string[];
  defaultBaseUrl?: string;
  onBaseUrlChange: (baseUrl: string) => void;
  contentTypeOptions?: string[];
}) => {
  const onChangeBodyContentType = useSetSelectedBodyContentType();
  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => onChangeBodyContentType(e.target.value),
    [onChangeBodyContentType]
  );

  return (
    <div className="text-sm md:text-base flex items-center">
      <div className="flex-1 flex items-center space-x-2">
        <RequestMethodBubble method={method} />
        {baseUrls && (
          <BaseUrlDropdown
            baseUrls={baseUrls}
            defaultValue={defaultBaseUrl}
            onChange={onBaseUrlChange}
          />
        )}
        <div className="font-mono text-[0.95rem] overflow-auto">
          <p className="inline-block text-slate-700 dark:text-slate-100 font-semibold">{path}</p>
        </div>
      </div>
      {contentTypeOptions && contentTypeOptions.length > 1 && (
        <div className="font-mono text-sm flex items-center space-x-2.5">
          <select
            id="contentType"
            name="contentType"
            className="text-right bg-transparent focus:outline-0 cursor-pointer text-gray-600 dark:text-gray-400"
            onChange={onChange}
          >
            {contentTypeOptions?.map((option, i) => (
              <option key={`${option}${i}`}>{option}</option>
            ))}
          </select>
          <svg
            width="3"
            height="24"
            viewBox="0 -9 3 24"
            className="text-slate-500 overflow-visible dark:text-slate-400 dark:group-hover:text-slate-500 rotate-90"
          >
            <path
              d="M0 0L3 3L0 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
};
