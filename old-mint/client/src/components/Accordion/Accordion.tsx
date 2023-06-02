import clsx from 'clsx';
import { ReactNode, useState } from 'react';

import { Event } from '@/enums/events';
import { useAnalyticsContext } from '@/hooks/useAnalyticsContext';
import { IconType } from '@/types/config';
import { ComponentIcon } from '@/ui/Icon';

import AccordionCover from './AccordionCover';
import getAccordionStyleFromVariant from './getAccordionStyleFromType';

function Accordion({
  title,
  description,
  defaultOpen = false,
  icon,
  iconType,
  children,
}: {
  title: string;
  description?: string;
  defaultOpen: boolean;
  icon?: ReactNode | string;
  iconType?: IconType;
  children: ReactNode;
}) {
  const trackOpen = useAnalyticsContext(Event.AccordionOpen);
  const trackClose = useAnalyticsContext(Event.AccordionClose);

  const onChange = (open: boolean) => {
    if (open) {
      trackOpen({ title }).catch(console.error);
    } else {
      trackClose({ title }).catch(console.error);
    }
  };

  const Icon =
    typeof icon === 'string' ? (
      <ComponentIcon icon={icon} iconType={iconType} className="w-4 h-4" />
    ) : (
      icon
    );

  return (
    <GenericAccordion
      title={title}
      description={description}
      defaultOpen={defaultOpen}
      onChange={onChange}
      icon={Icon}
    >
      {children}
    </GenericAccordion>
  );
}

function GenericAccordion({
  title,
  description,
  defaultOpen = false,
  icon,
  onChange,
  variant = 'rounded',
  children,
}: {
  /** The main text of the Accordion shown in bold */
  title: string;

  /** Text under the title */
  description?: string;

  /** Whether the Accordion is open initially */
  defaultOpen?: boolean;

  /** Icon to display to the left */
  icon?: ReactNode;

  /** Callback when the Accordion is clicked with the new open state */
  onChange?: (open: boolean) => void;

  /** The Accordion UI style */
  variant?: 'rounded' | 'minimalist';

  /** The Accordion contents */
  children: ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(Boolean(defaultOpen));

  const onClickOpen = (open: boolean) => {
    setOpen(open);
    if (onChange) {
      onChange(open);
    }
  };

  const { parentClass, coverClass, contentClass } = getAccordionStyleFromVariant(variant);

  return (
    <div key={title} role="listitem" className={parentClass}>
      <AccordionCover
        title={title}
        description={description}
        open={open}
        setOpen={onClickOpen}
        icon={icon}
        coverClass={coverClass}
      />
      <div className={clsx(contentClass, !open && 'hidden')}>{children}</div>
    </div>
  );
}

export default Accordion;
