import { OpenAPIV3 } from 'openapi-types';
import React, { useState } from 'react';

import ExpandableFields from '.';
import { Dropdown } from './Dropdown';

const OneOf = ({ oneOfOptions }: { oneOfOptions: OpenAPIV3.SchemaObject[] }) => {
  const options = oneOfOptions.map((option, i) => option.title || option.type || i.toString());
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onChange = (str: string) => setSelectedIndex(options.indexOf(str));
  return (
    <div className="pt-4">
      <Dropdown options={options} value={options[selectedIndex]} onInputChange={onChange} />
      <div role="listitem" className="">
        <div
          className={'mt-2 pt-2 mb-4 mx-[6px] px-4 border-l border-gray-100 dark:border-gray-800'}
        >
          {oneOfOptions[selectedIndex]?.type === 'object' ? (
            <ExpandableFields schema={oneOfOptions[selectedIndex]} />
          ) : (
            <>
              {typeof oneOfOptions[selectedIndex]?.enum != 'undefined' &&
                Array.isArray(oneOfOptions[selectedIndex].enum) && (
                  <div className="whitespace-pre-wrap">
                    Available options:{' '}
                    {(oneOfOptions[selectedIndex].enum as string[]).map(
                      (enumValue: string, i: number) => (
                        <div key={`${enumValue}-${i}`} className="inline-block">
                          <code>{enumValue}</code>
                          {i !== (oneOfOptions[selectedIndex].enum as string[]).length - 1 &&
                            ','}{' '}
                        </div>
                      )
                    )}
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneOf;
