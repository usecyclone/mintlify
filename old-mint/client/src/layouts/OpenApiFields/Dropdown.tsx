import React, { ChangeEvent } from 'react';

const Dropdown = ({
  onChange,
  options,
}: {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) => {
  return (
    <div className="mt-4 font-mono text-sm flex items-center space-x-2.5">
      <select
        id="contentType"
        name="contentType"
        className="text-right bg-transparent focus:outline-0 cursor-pointer text-gray-600 dark:text-gray-400"
        onChange={onChange}
      >
        {options.map((option, i) => (
          <option key={`${option}-${i}`}>{option}</option>
        ))}
      </select>
      <svg
        width="3"
        height="24"
        viewBox="0 -9 3 24"
        className="text-gray-500 overflow-visible dark:text-gray-400 dark:group-hover:text-gray-500 rotate-90"
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
  );
};

export default Dropdown;
