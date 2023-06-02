import { ComponentPropsWithoutRef, createElement, ElementType, Fragment, ReactNode } from 'react';
import { renderToString } from 'react-dom/server';

import { IS_DEV } from '@/constants';

import { useStaticContent } from './useStaticContent';

export type StaticProps<T> = {
  children?: ReactNode;
  /**
   * Type of element to be rendered.
   */
  as?: T;
  /**
   * Whether to rerender during hydrate or avoid re-rendering on the client until hydrated.
   * Suppresses Hydration error. Defaults to avoiding re-render until hydrated.
   */
  hydrateRerender?: boolean;
  /**
   * Whether to print console warning.
   */
  printConsoleWarnings?: boolean;
};

export type StaticContentProps<T extends ElementType> = StaticProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof StaticProps<T>>;

export const StaticContent = <T extends ElementType = typeof Fragment>({
  children,
  as,
  hydrateRerender = false,
  printConsoleWarnings = IS_DEV,
  ...props
}: StaticContentProps<T>) => {
  const { render, ref } = useStaticContent(printConsoleWarnings, hydrateRerender);

  const Component = as || typeof Fragment;
  // render if we're in the server or a spa navigation.
  if (render) {
    return createElement(
      Component,
      {
        ...props,
        ref,
      },
      children
    );
  }

  // avoid re-render on the client until hydrated.
  return createElement(Component, {
    ...props,
    ref,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: { __html: renderToString(<>{children}</>) },
  });
};
