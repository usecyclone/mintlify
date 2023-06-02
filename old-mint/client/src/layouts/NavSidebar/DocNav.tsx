import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef, useContext, useEffect, useState } from 'react';

import { getMethodBgColor } from '@/components/Api/colors';
import { ConfigContext } from '@/context/ConfigContext';
import { useCurrentPath } from '@/hooks/useCurrentPath';
import { Group, GroupPage, Groups, isGroup } from '@/types/metadata';
import Icon from '@/ui/Icon';
import { extractMethodAndEndpoint } from '@/utils/api';
import { getSidebarTitle } from '@/utils/getAllMetaTags';
import { isPathInGroupPages } from '@/utils/nav';
import { isPathInGroup } from '@/utils/paths/isPathInGroup';
import { isEqualIgnoringLeadingSlash } from '@/utils/paths/leadingSlashHelpers';

const getMethodInactiveColor = (method?: string): string => {
  switch (method?.toUpperCase()) {
    case 'GET':
      return 'bg-green-400/20 text-green-700 dark:bg-green-400/20 dark:text-green-400';
    case 'POST':
      return 'bg-blue-400/20 text-blue-700 dark:bg-blue-400/20 dark:text-blue-400';
    case 'PUT':
      return 'bg-yellow-400/20 text-yellow-700 dark:bg-yellow-400/20 dark:text-yellow-400';
    case 'DELETE':
      return 'bg-red-400/20 text-red-700 dark:bg-red-400/20 dark:text-red-400';
    case 'PATCH':
      return 'bg-orange-400/20 text-orange-700 dark:bg-orange-400/20 dark:text-orange-400';
    default:
      return 'bg-gray-400/20 text-gray-700 dark:bg-gray-400/20 dark:text-gray-400';
  }
};

const getShortenedMethodName = (method?: string): string | undefined => {
  switch (method?.toUpperCase()) {
    case 'DELETE':
      return 'DEL';
    case 'PATCH':
      return 'PAT';
    default:
      return method;
  }
};

const getPaddingByLevel = (level: number) => {
  // level 0 -> 0rem
  // level 1 -> 0.75rem
  // level 2 -> 1.50rem and so on.
  return `${1 + level * 0.75}rem`;
};

const NavItem = forwardRef(function NavItemWithRef(
  {
    groupPage,
    level = 0,
    mobile = false,
  }: { groupPage: GroupPage | undefined; level?: number; mobile?: boolean },
  ref: any
) {
  const currentPath = useCurrentPath();

  if (groupPage == null) {
    return null;
  }

  if (isGroup(groupPage)) {
    return <GroupDropdown group={groupPage} level={level} mobile={mobile} />;
  }

  const { href, api: pageApi, openapi, url } = groupPage;

  const isActive = isEqualIgnoringLeadingSlash(href, currentPath);
  const endpointStr = pageApi || openapi;
  const title = getSidebarTitle(groupPage);

  const method = endpointStr && extractMethodAndEndpoint(endpointStr).method;

  return (
    <li ref={ref}>
      <Link
        href={url || href || '/'}
        className={clsx(
          'group mt-2 lg:mt-0 flex items-center -ml-4 py-1.5 rounded-lg focus:outline-primary dark:focus:outline-primary-light',
          isActive
            ? 'bg-primary/10 text-primary font-semibold dark:text-primary-light dark:bg-primary-light/10'
            : 'hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
        )}
        style={{
          paddingLeft: getPaddingByLevel(level),
        }}
        target={url && '_blank'}
      >
        {endpointStr && groupPage?.hideApiMarker !== true && (
          <span className="w-11 flex items-center">
            <span
              className={clsx(
                'px-1 py-0.5 mr-2 rounded-[0.3rem] text-[0.55rem] leading-tight font-bold',
                isActive ? `${getMethodBgColor(method)} text-white` : getMethodInactiveColor(method)
              )}
            >
              {getShortenedMethodName(method)}
            </span>
          </span>
        )}
        {groupPage.icon && (
          <Icon
            icon={groupPage.icon}
            iconType="regular"
            className={clsx(
              'mr-3 h-4 w-4',
              isActive ? 'bg-primary dark:bg-primary-light' : 'bg-gray-400 dark:bg-gray-500'
            )}
          />
        )}
        <div className="flex-1 flex items-center space-x-2.5">
          <div>{title}</div>
          {url && (
            <svg
              className="h-2.5 text-gray-400 overflow-visible group-hover:text-gray-600 dark:text-gray-600 dark:group-hover:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              fill="currentColor"
            >
              <path d="M328 96c13.3 0 24 10.7 24 24V360c0 13.3-10.7 24-24 24s-24-10.7-24-24V177.9L73 409c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l231-231H88c-13.3 0-24-10.7-24-24s10.7-24 24-24H328z" />
            </svg>
          )}
        </div>
      </Link>
    </li>
  );
});

const GroupDropdown = ({
  group,
  level,
  mobile,
}: {
  group: Group;
  level: number;
  mobile: boolean;
}) => {
  const router = useRouter();
  const currentPath = useCurrentPath();
  const [isOpen, setIsOpen] = useState(Boolean(isPathInGroup(currentPath, group)));
  const { group: name, pages } = group;

  // Open the menu when we navigate to a page in the group.
  // We use useEffect instead of modifying the useState default
  // value so we can open menus even after the page has loaded.
  useEffect(() => {
    if (isPathInGroup(currentPath, group)) {
      setIsOpen(true);
    }
  }, [currentPath, group]);

  if (!name || !pages) {
    return null;
  }

  const onClick = () => {
    // Do not navigate if:
    // 1. We are on mobile (users need to a larger space to tap to open the menu)
    // 2. closing
    // 3. The first link is another nested menu
    // 4. The current page is in the nested pages being exposed
    if (
      !mobile &&
      !isOpen &&
      !isGroup(pages[0]) &&
      pages[0]?.href &&
      !isPathInGroupPages(currentPath, pages)
    ) {
      // Navigate to the first page if it exists
      router.push(pages[0].href);
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <li>
        <div
          className={
            'mt-2 lg:mt-px group flex py-1.5 -ml-4 items-center space-x-3 cursor-pointer rounded-lg hover:bg-gray-600/5 dark:hover:bg-gray-200/5 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
          }
          style={{
            paddingLeft: getPaddingByLevel(level),
          }}
          onClick={onClick}
        >
          {group.icon && (
            <Icon
              icon={group.icon}
              iconType="regular"
              className={clsx('h-4 w-4 bg-gray-400 dark:bg-gray-500')}
            />
          )}
          <p>{name}</p>
          <svg
            width="3"
            height="24"
            viewBox="0 -9 3 24"
            className={clsx(
              'transition-transform text-gray-400 overflow-visible group-hover:text-gray-600 dark:text-gray-600 dark:group-hover:text-gray-400',
              isOpen && 'duration-75 rotate-90'
            )}
          >
            <path
              d="M0 0L3 3L0 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
          </svg>
        </div>
        {isOpen && (
          <ul>
            {pages.map((subpage) => {
              const key = isGroup(subpage) ? subpage.group : subpage.sidebarTitle || subpage.title;
              return <NavItem groupPage={subpage} level={level + 1} mobile={mobile} key={key} />;
            })}
          </ul>
        )}
      </li>
    </>
  );
};

export function DocNav({ nav, mobile }: { nav: Groups; mobile: boolean }) {
  const { mintConfig } = useContext(ConfigContext);

  let numPages = 0;
  if (nav) {
    nav.forEach((group: Group) => {
      numPages += group.pages.length;
    });
  }

  return (
    <>
      {nav &&
        numPages > 0 &&
        nav
          .map(({ group, pages }: Group, i: number) => {
            return (
              <div
                key={i}
                className={clsx({
                  'mt-12 lg:mt-8': !Boolean(
                    i === 0 && (mintConfig?.anchors == null || mintConfig.anchors?.length === 0)
                  ),
                })}
              >
                <h5 className="mb-3.5 lg:mb-2.5 font-semibold text-gray-900 dark:text-gray-200">
                  {group}
                </h5>
                {pages.map((page, i: number) => {
                  return <NavItem key={i} groupPage={page} mobile={mobile} />;
                })}
              </div>
            );
          })
          .filter(Boolean)}
    </>
  );
}
