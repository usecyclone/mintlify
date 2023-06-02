import { ChangeEvent } from 'react';

const DefaultInput = ({
  placeholder,
  value,
  onChange,
  type,
}: {
  placeholder?: string;
  value: never;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
}) => {
  return (
    <input
      className="w-full py-0.5 px-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 text-gray-700 dark:text-gray-200"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default DefaultInput;
