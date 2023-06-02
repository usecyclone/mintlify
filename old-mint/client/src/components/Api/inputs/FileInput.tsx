const FileInput = ({
  isMultiFile,
  onInputChange,
  value,
}: {
  isMultiFile: boolean;
  onInputChange: (value: any) => void;
  value: any;
}) => {
  const valueExists = value != null && typeof value == 'string' && value.length > 0;
  const multipleFilesSelected = typeof window != 'undefined' && value instanceof FileList;
  const defaultText = isMultiFile ? 'Select file(s)' : 'Select a file';
  return (
    <button className="relative flex items-center px-2 w-full h-7 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 text-gray-700 dark:text-gray-200 border-dashed hover:bg-gray-50 dark:hover:bg-white/10 dark:hover:border-gray-500">
      <input
        name="files[]"
        className="z-5 absolute inset-0 opacity-0 cursor-pointer"
        type="file"
        multiple={isMultiFile}
        onChange={async (event) => {
          if (event.target.files == null) {
            return;
          }
          onInputChange(event.target.files);
        }}
      />
      <svg
        className="absolute right-2 top-[7px] h-3 fill-gray-500 dark:fill-gray-400 bg-border-gray-700 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M105.4 182.6c12.5 12.49 32.76 12.5 45.25 .001L224 109.3V352c0 17.67 14.33 32 32 32c17.67 0 32-14.33 32-32V109.3l73.38 73.38c12.49 12.49 32.75 12.49 45.25-.001c12.49-12.49 12.49-32.75 0-45.25l-128-128C272.4 3.125 264.2 0 256 0S239.6 3.125 233.4 9.375L105.4 137.4C92.88 149.9 92.88 170.1 105.4 182.6zM480 352h-160c0 35.35-28.65 64-64 64s-64-28.65-64-64H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456z" />
      </svg>
      <span className="w-full truncate text-left inline-block pointer-events-none">
        {valueExists
          ? (value as string)
          : multipleFilesSelected
          ? Object.values(value)
              .map(({ name }) => name)
              .join(';')
          : defaultText}
      </span>
    </button>
  );
};

export default FileInput;
