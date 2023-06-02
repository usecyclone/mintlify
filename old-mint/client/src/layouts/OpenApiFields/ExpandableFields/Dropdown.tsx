export const Dropdown = ({
  options,
  value,
  onInputChange,
}: {
  options: string[];
  value: string | undefined;
  onInputChange: (newValue: string) => void;
}) => (
  <div className="inline-block">
    <div className="flex flex-row items-center relative">
      <select
        className="w-full py-0.5 pr-7 pl-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 text-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer"
        onChange={(e) => onInputChange(e.target.value)}
        value={value || 'Select'}
      >
        <option disabled>Select</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <DownArrowSvg />
    </div>
  </div>
);

const DownArrowSvg = () => (
  <svg
    className="absolute right-2 h-3 fill-gray-500 dark:fill-gray-400 pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
  >
    <path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z" />
  </svg>
);
