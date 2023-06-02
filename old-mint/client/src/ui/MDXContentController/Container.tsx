import clsx from 'clsx';
import { ReactNode } from 'react';

import { useMDXContent } from '@/hooks/useMDXContent';

import { SidePanel } from './SidePanel';

export const Container = ({ children }: { children: ReactNode }) => {
  const [{ contentWidth }] = useMDXContent();
  return (
    <div className="flex flex-row pt-9 items-stretch gap-12">
      <div
        className={clsx(
          'relative grow mx-auto overflow-auto xl:-ml-12 xl:pr-1 xl:pl-14',
          contentWidth
        )}
      >
        {children}
      </div>
      <SidePanel />
    </div>
  );
};
