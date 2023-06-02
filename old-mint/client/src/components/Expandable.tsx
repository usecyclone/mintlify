import clsx from 'clsx';
import { ReactNode, useState } from 'react';

import { useAnalyticsContext } from '@/hooks/useAnalyticsContext';

import ExpandableCover from './ExpandableCover';

export function Expandable({
  title,
  defaultOpen = false,
  onChange: onChangeProp,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  onChange?: (open: boolean) => void;
  children: ReactNode;
}) {
  const openAnalyticsListener = useAnalyticsContext('expandable_open');
  const closeAnalyticsListener = useAnalyticsContext('expandable_close');

  const onChange = (open: boolean) => {
    if (onChangeProp) {
      onChangeProp(open);
    }

    if (open) {
      openAnalyticsListener({ title });
    } else {
      closeAnalyticsListener({ title });
    }
  };

  return (
    <GenericExpandable title={title} onChange={onChange} defaultOpen={defaultOpen}>
      {children}
    </GenericExpandable>
  );
}

function GenericExpandable({
  title,
  description,
  defaultOpen = false,
  onChange,
  children,
}: {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  onChange?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  const onClickOpen = (open: boolean) => {
    setOpen(open);
    if (onChange) {
      onChange(open);
    }
  };

  return (
    <div key={title} role="listitem" className="">
      <ExpandableCover title={title} description={description} open={open} setOpen={onClickOpen} />
      <div
        id={title + 'Children'}
        className={clsx(
          'mt-2 pt-2 mb-4 mx-[6px] px-4 border-l border-gray-100 dark:border-gray-800',
          !open && 'hidden'
        )}
      >
        {children}
      </div>
    </div>
  );
}
