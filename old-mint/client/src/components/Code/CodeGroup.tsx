import { Tab } from '@headlessui/react';
import { clsx } from 'clsx';
import React, {
  ComponentPropsWithoutRef,
  FormEventHandler,
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
} from 'react';

import { CodeBlockProps, CopyToClipboardButton } from './CodeBlock';
import { CopyToClipboardResult } from './copyToClipboard';
import { getNodeText } from './getNodeText';

export type CodeGroupPropsBase = {
  /**
   * Color of the filename text and the border underneath it when the content is being shown
   */
  selectedColor?: string;
  /**
   * Background color for the tooltip saying `Click to Copy` when hovering the clipboard button.
   */
  tooltipColor?: string;
  /**
   * The callback function when a user clicks on the copied to clipboard button
   */
  onCopied?: (result: CopyToClipboardResult, textToCopy?: string) => void;

  isSmallText?: boolean;

  children?: ReactElement<CodeBlockProps>[] | ReactElement<CodeBlockProps>;

  onChange?: FormEventHandler<HTMLDivElement> & ((index: number) => void);
};

export type CodeGroupProps = CodeGroupPropsBase &
  Omit<ComponentPropsWithoutRef<'div'>, keyof CodeGroupPropsBase>;

/**
 * Group multiple code blocks into a tabbed UI.
 * Uses CodeBlocks as children but does not render them directly. Instead,
 * CodeGroup extracts the props and renders CodeBlock's children.
 *
 * @param {CodeBlock[]} - children
 */
export const CodeGroup = forwardRef(function CodeGroup(
  {
    children,
    selectedColor,
    tooltipColor,
    onCopied,
    isSmallText,
    className,
    ...props
  }: CodeGroupProps,
  ref: ForwardedRef<HTMLDivElement> | undefined
) {
  if (children == null) {
    // Hide the frame when no children were passed
    console.warn('CodeGroup has no children, expected at least one CodeBlock child.');
    return null;
  } else if (!Array.isArray(children)) {
    // Allow looping over a single child
    children = [children];
  } else if (children.length === 0) {
    return null;
  }
  const childArr = React.Children.toArray(children) as Array<
    Exclude<React.ReactElement<CodeBlockProps>, boolean | null | undefined>
  >;
  return (
    <Tab.Group
      ref={ref}
      as="div"
      className={clsx(
        'not-prose bg-[#0F1117] dark:bg-codeblock rounded-xl dark:ring-1 dark:ring-gray-800 relative',
        className
      )}
      {...props}
    >
      <Tab.List className="flex text-xs bg-black leading-6 rounded-t-xl border-b border-gray-900">
        {({ selectedIndex }) => (
          <>
            <div className="flex overflow-x-auto">
              {childArr.map((child, tabIndex: number) => (
                <>
                  <TabItem
                    key={child?.props?.filename + 'TabItem' + tabIndex}
                    myIndex={tabIndex}
                    selectedIndex={selectedIndex}
                    selectedColor={selectedColor}
                    tabsLength={childArr.length}
                  >
                    {child?.props?.filename}
                  </TabItem>
                </>
              ))}
            </div>
            <div className={clsx('flex-auto flex justify-end items-center pr-4 rounded-tr')}>
              <CopyToClipboardButton
                textToCopy={getNodeText(childArr[selectedIndex]?.props?.children)}
                tooltipColor={tooltipColor ?? selectedColor}
                onCopied={onCopied}
              />
            </div>
          </>
        )}
      </Tab.List>
      <Tab.Panels className="flex overflow-auto">
        {childArr.map((child) => (
          <Tab.Panel
            key={child?.props?.filename}
            className={clsx(
              'flex-none text-gray-50 p-5 min-w-full text-sm overflow-x-auto',
              isSmallText ? 'text-xs leading-[1.35rem]' : 'leading-6'
            )}
            style={{ fontVariantLigatures: 'none' }}
          >
            {child?.props?.children}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
});

interface TabItemProps {
  children: ReactNode;
  selectedIndex: number;
  myIndex: number;
  tabsLength: number;
  selectedColor?: string;
}

function TabItem({
  children,
  selectedIndex,
  myIndex,
  tabsLength,
  selectedColor = '#CBD5E1',
}: TabItemProps) {
  const isSelected = selectedIndex === myIndex;

  return (
    <Tab
      className="group flex items-center relative px-2 pt-2.5 pb-2 text-gray-400 outline-none whitespace-nowrap font-medium"
      style={isSelected ? { color: selectedColor } : {}}
    >
      <div
        className={clsx(
          'px-2 rounded-md',
          tabsLength <= 1 || 'group-hover:bg-gray-700/60 group-hover:text-primary-light'
        )}
      >
        <div className="z-10">{children}</div>
      </div>

      {/* Active tab highlight bar */}
      {isSelected && (
        <div
          className="pointer-events-none absolute inset-0 border-b"
          style={{ borderColor: selectedColor }}
        />
      )}
    </Tab>
  );
}
