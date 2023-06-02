import { clsx } from 'clsx';
import React from 'react';
import { ReactNode } from 'react';

import { ExpandableItemCoverIcon } from '../ExpandableCover';

function AccordionCover({
  title,
  description,
  open,
  setOpen,
  icon,
  coverClass,
}: {
  title: string;
  description?: string;
  open: boolean;
  setOpen: (open: boolean) => any;
  icon?: ReactNode;
  coverClass: string;
}) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className={clsx('not-prose flex flex-row items-center content-center w-full', coverClass)}
      aria-controls={title + 'Children'}
      aria-expanded={open}
    >
      <div className="mr-0.5">
        <ExpandableItemCoverIcon open={open} />
      </div>
      {icon ? (
        <div className="h-4 w-4 fill-gray-800 dark:fill-gray-100 text-gray-800 dark:text-gray-100">
          {icon}
        </div>
      ) : null}
      <div className="leading-tight text-left">
        <p className="m-0 font-medium text-gray-900 dark:text-gray-200">{title}</p>
        {description ? <p className="m-0 text-gray-900 dark:text-gray-200">{description}</p> : null}
      </div>
    </button>
  );
}

export default AccordionCover;
