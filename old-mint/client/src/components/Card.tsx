import clsx from 'clsx';
import isAbsoluteUrl from 'is-absolute-url';
import Link from 'next/link';
import { ComponentPropsWithoutRef, ElementType, forwardRef, ReactNode, Ref } from 'react';
import React from 'react';

import { IconType } from '@/types/config';
import { ComponentIcon } from '@/ui/Icon';

export function Card({
  title,
  icon,
  iconType,
  color,
  href,
  children,
}: {
  title?: string;
  icon?: ReactNode | string;
  iconType?: IconType;
  color?: string;
  href?: string;
  children?: React.ReactNode;
}) {
  const Icon =
    typeof icon === 'string' ? (
      <ComponentIcon
        icon={icon}
        iconType={iconType}
        color={color}
        className="h-6 w-6 bg-primary dark:bg-primary-light"
        overrideColor
      />
    ) : (
      icon
    );

  // Using 'a' because href is passed, which makes the card an anchor element.
  const props: CardProps<'a'> = {
    as: 'a',
    className: clsx(href && 'hover:!border-primary dark:hover:!border-primary-light'),
    title,
    icon: Icon,
    href,
    children,
  };

  // Resolves `Function components cannot be given refs` warning.
  const RefCard = forwardRef<'a', CardProps<'a'>>((args, ref) => (
    <GenericCard {...args} mRef={ref} />
  ));
  RefCard.displayName = 'RefCard';

  // We don't use DynamicLink because we cannot wrap the Card in an extra <a> tag without
  // messing with the Card's styling. The Card already sets an <a> tag when href is passed to it.
  if (href && (href.startsWith('/') || href.startsWith('#'))) {
    return (
      <Link href={href} passHref legacyBehavior>
        <RefCard {...props} />
      </Link>
    );
  }

  return <GenericCard {...props} />;
}

export interface CardPropsBase<T> {
  /**
   * Large title above children.
   */
  title?: string;
  /**
   * Icon to the top-left of the title. Can be a ReactNode or a string equal to an image source.
   */
  icon?: ReactNode;
  /**
   * If provided, will render an image to the top of the card.
   */
  image?: string;
  /**
   * Type of element to be rendered.
   */
  as?: T;
  /**
   * If provided, will render as an anchor element.
   */
  href?: string;
  /**
   * Ref of the element to be rendered.
   */
  mRef?: Ref<T | undefined>;
}

/**
 * Props for the `Card` component
 * @typeParam T - Type of the Element rendered by the card.
 */
export type CardProps<T extends ElementType> = CardPropsBase<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof CardPropsBase<T>>;

export function GenericCard<T extends ElementType = 'div'>({
  title,
  icon,
  image,
  className,
  children,
  as,
  mRef,
  ...props
}: CardProps<T>) {
  /**
   * If provided, use `as` or an `a` tag if linking to things with href.
   * Defaults to `div`.
   */
  const Component = as || props.href != undefined ? 'a' : 'div';

  const openLinksInNewTab = isAbsoluteUrl(props.href ?? '');
  const newTabProps = openLinksInNewTab ? { target: '_blank', rel: 'noreferrer' } : {};

  const isImageSrc: boolean = typeof icon === 'string';

  const renderIcon: JSX.Element = (
    <>
      {icon ? (
        isImageSrc ? (
          <img src={icon as string} alt={title} className="h-6 w-6 object-cover object-center" />
        ) : (
          <div className="h-6 w-6 fill-gray-800 dark:fill-gray-100 text-gray-800 dark:text-gray-100">
            {icon}
          </div>
        )
      ) : null}
    </>
  );

  return (
    <Component
      className={clsx(
        'block not-prose font-normal group relative my-2 ring-2 ring-transparent rounded-xl dark:bg-codeblock border border-gray-200 dark:border-gray-800 overflow-hidden w-full',
        props.href && 'cursor-pointer',
        className
      )}
      {...newTabProps}
      {...props}
      ref={mRef as Ref<never>}
    >
      {image && <img src={image} alt={image} className="w-full h-64 object-cover object-center" />}
      <div className="px-6 py-5">
        {renderIcon}
        <h2
          className={clsx(
            'font-semibold text-base text-gray-800 dark:text-white',
            icon !== null && icon !== undefined && 'mt-4'
          )}
        >
          {title}
        </h2>
        <span
          className={clsx(
            'mt-1 font-normal',
            title ? 'text-gray-600 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300'
          )}
        >
          {children}
        </span>
      </div>
    </Component>
  );
}
