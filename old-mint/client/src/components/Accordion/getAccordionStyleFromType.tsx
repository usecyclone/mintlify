export default function getAccordionStyleFromVariant(variant: string) {
  if (variant === 'minimalist') {
    // Minimal padding. Shows a border along the left when open.
    return {
      parentClass: '',
      coverClass:
        '[&>div]:ml-2 py-1 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200',
      contentClass: 'mt-2 pt-1 mb-4 mx-[7px] px-4 border-l border-gray-100 dark:border-gray-800',
    };
  }

  // Rounding is handled in Accordion by passing in isRounded to AccordionCover.
  return {
    parentClass: 'border dark:border-gray-800 rounded-xl mb-3 overflow-hidden dark:bg-codeblock',
    coverClass: 'py-4 px-5 space-x-2 hover:bg-gray-100 hover:dark:bg-gray-800 rounded-t-xl',
    contentClass: 'mt-2 mb-4 mx-6',
  };
}
