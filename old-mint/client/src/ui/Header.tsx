import axios from 'axios';
import clsx from 'clsx';
import gh from 'github-url-to-object';
import isAbsoluteUrl from 'is-absolute-url';
import Link from 'next/link';
import Router from 'next/router';
import { useContext } from 'react';
import { useEffect, useState } from 'react';

import { ConfigContext } from '@/context/ConfigContext';
import { Event } from '@/enums/events';
import { useAnalyticsContext } from '@/hooks/useAnalyticsContext';
import { zIndex } from '@/layouts/zIndex';
import { TopbarCta } from '@/types/config';
import { Logo } from '@/ui/Logo';
import { SearchButton } from '@/ui/search/Search';
import getLogoHref from '@/utils/getLogoHref';

import Icon from './Icon';
import { ThemeToggle } from './ThemeToggle';
import { VersionSelect } from './VersionSelect';

function GitHubCta({ button }: { button: TopbarCta }) {
  const trackCtaClick = useAnalyticsContext(Event.CTAClick);
  const [repoData, setRepoData] = useState<{ stargazers_count: number; forks_count: number }>();

  const github = gh(button.url);

  useEffect(() => {
    if (github == null) {
      return;
    }

    axios.get(`https://api.github.com/repos/${github.user}/${github.repo}`).then(({ data }) => {
      setRepoData(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [github?.user, github?.repo]);

  if (github == null) {
    return null;
  }

  return (
    <li className="cursor-pointer">
      <a
        href={button.url}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackCtaClick({ url: button.url, type: 'github' })}
      >
        <div className="group flex items-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1024"
            height="1024"
            viewBox="0 0 1024 1024"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
              transform="scale(64)"
            />
          </svg>
          <div className="font-normal">
            <div className="text-sm font-medium text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-200">
              {github.user}/{github.repo}
            </div>
            {repoData ? (
              <div className="text-xs flex items-center space-x-2 text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                <span className="flex items-center space-x-1">
                  <Icon
                    className="h-3 w-3 bg-gray-600 dark:bg-gray-400 group-hover:bg-gray-700 dark:group-hover:bg-gray-300"
                    icon="star"
                    iconType="regular"
                  />
                  <span>{repoData.stargazers_count}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon
                    className="h-3 w-3 bg-gray-600 dark:bg-gray-400 group-hover:bg-gray-700 dark:group-hover:bg-gray-300"
                    icon="code-fork"
                    iconType="regular"
                  />
                  <span>{repoData.forks_count}</span>
                </span>
              </div>
            ) : (
              <div className="h-4" />
            )}
          </div>
        </div>
      </a>
    </li>
  );
}

function TopBarCtaButton({ button }: { button: TopbarCta }) {
  const trackCtaClick = useAnalyticsContext(Event.CTAClick);

  if (button.type === 'github') {
    return <GitHubCta button={button} />;
  }

  if (button.url && button.name) {
    return (
      <li>
        <Link
          href={button.url ?? '/'}
          target="_blank"
          className="group px-4 py-1.5 relative inline-flex items-center rounded-full shadow-sm text-sm font-medium"
          onClick={() => trackCtaClick({ name: button.name, url: button.url, type: 'button' })}
        >
          <span className="absolute inset-0 bg-primary-dark rounded-full group-hover:opacity-[0.9]" />
          <div className="space-x-2.5 flex items-center">
            <span className={clsx(zIndex.Control, 'text-white')}>{button.name}</span>
            <svg
              width="6"
              height="3"
              className="h-2 overflow-visible -rotate-90 text-white"
              aria-hidden="true"
            >
              <path
                d="M0 0L3 3L6 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </Link>
      </li>
    );
  }

  return null;
}

export function NavItems() {
  const { mintConfig } = useContext(ConfigContext);
  const trackNavigationClick = useAnalyticsContext(Event.HeaderNavItemClick);

  const onClickNavigation = (name: string | undefined, url: string) => {
    trackNavigationClick({ name, url });
  };

  return (
    <>
      {mintConfig?.topbarLinks?.map((topbarLink) => {
        const isAbsolute = isAbsoluteUrl(topbarLink.url);

        if (isAbsolute) {
          return (
            <li key={topbarLink.name}>
              <a
                href={topbarLink.url}
                className="font-medium hover:text-primary dark:hover:text-primary-light"
                onClick={() => onClickNavigation(topbarLink.name, topbarLink.url)}
              >
                {topbarLink.name}
              </a>
            </li>
          );
        } else {
          return (
            <li key={topbarLink.name}>
              <Link
                href={topbarLink.url ?? '/'}
                className="font-medium hover:text-primary dark:hover:text-primary-light"
                onClick={() => onClickNavigation(topbarLink.name, topbarLink.url)}
              >
                {topbarLink.name}
              </Link>
            </li>
          );
        }
      })}
      {mintConfig?.topbarCtaButton && <TopBarCtaButton button={mintConfig.topbarCtaButton} />}
    </>
  );
}

export function Header({
  hasNav = false,
  navIsOpen,
  onNavToggle,
  title,
  section,
}: {
  hasNav: boolean;
  navIsOpen: boolean;
  onNavToggle: (toggle: boolean) => void;
  title?: string;
  section?: string;
}) {
  const { mintConfig } = useContext(ConfigContext);
  const [isOpaque, setIsOpaque] = useState(false);

  useEffect(() => {
    const offset = 50;
    function onScroll() {
      if (!isOpaque && window.scrollY > offset) {
        setIsOpaque(true);
      } else if (isOpaque && window.scrollY <= offset) {
        setIsOpaque(false);
      }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isOpaque]);

  return (
    <>
      <div
        className={clsx(
          zIndex.Navbar,
          'sticky top-0 w-full backdrop-blur flex-none lg:border-b lg:border-gray-900/5 dark:border-gray-50/[0.06]'
        )}
      >
        <div
          className={clsx(
            'absolute top-0 right-0 left-0 bottom-0 bg-background-light dark:bg-background-dark',
            isOpaque ? '' : 'bg-transparent dark:bg-transparent'
          )}
          style={{ opacity: '80%' }}
        />
        <div className="relative max-w-8xl mx-auto">
          <div
            className={clsx(
              'py-5 lg:py-4 lg:px-12 border-b border-gray-900/10 lg:border-0 dark:border-gray-300/10',
              hasNav ? 'mx-4 lg:mx-0' : 'px-4'
            )}
          >
            <div className="relative flex items-center">
              <div className="flex-1 flex items-center space-x-4">
                <Link
                  href={mintConfig ? getLogoHref(mintConfig) : '/'}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    Router.push(mintConfig ? getLogoHref(mintConfig) : '/');
                  }}
                >
                  <span className="sr-only">{mintConfig?.name} home page</span>
                  <Logo />
                </Link>
                <VersionSelect />
              </div>
              <div className="relative flex-none bg-white lg:w-64 xl:w-96 dark:bg-gray-900 pointer-events-auto rounded-md">
                <SearchButton className="hidden w-full lg:flex items-center text-sm leading-6 rounded-md py-1.5 pl-2 pr-3 zinc-box bg-white ring-1 ring-gray-400/20 hover:ring-gray-600/25 dark:ring-gray-600/30 dark:hover:ring-gray-500/30 focus:outline-primary">
                  {({ actionKey }) => (
                    <>
                      <Icon
                        icon="magnifying-glass"
                        iconType="solid"
                        className="h-4 w-4 ml-1 mr-3 flex-none bg-gray-500 hover:bg-gray-600 dark:bg-white/50 dark:hover:bg-white/70"
                      />
                      Search...
                      {actionKey && (
                        <span className="ml-auto flex-none text-xs font-semibold">
                          {actionKey[0]}K
                        </span>
                      )}
                    </>
                  )}
                </SearchButton>
              </div>
              <div className="flex-1 relative hidden lg:flex items-center ml-auto justify-end">
                <nav className="text-sm leading-6 font-semibold text-gray-700 dark:text-gray-200">
                  <ul className="flex space-x-8 items-center">
                    <NavItems />
                  </ul>
                </nav>
                {!mintConfig?.modeToggle?.isHidden && (
                  <div className="flex border-l border-gray-100 ml-6 pl-6 dark:border-background-dark dark:brightness-200 h-6"></div>
                )}
                <div className="flex items-center">
                  <ThemeToggle />
                </div>
              </div>
              <SearchButton className="ml-auto text-gray-500 w-8 h-8 -my-1 flex items-center justify-center hover:text-gray-600 lg:hidden dark:text-gray-400 dark:hover:text-gray-300">
                <span className="sr-only">Search</span>
                <Icon
                  icon="magnifying-glass"
                  iconType="solid"
                  className="h-4 w-4 bg-gray-500 dark:bg-gray-400 hover:bg-gray-600 dark:hover:bg-gray-300"
                />
              </SearchButton>
            </div>
          </div>
          {hasNav && (
            <div className="flex items-center py-4 px-5 border-b border-gray-900/10 lg:hidden dark:border-gray-50/[0.06]">
              <button
                type="button"
                onClick={() => onNavToggle(!navIsOpen)}
                className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <span className="sr-only">Navigation</span>
                <svg
                  className="h-4"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                </svg>
              </button>
              {title && (
                <div className="ml-4 flex text-sm leading-6 whitespace-nowrap min-w-0 space-x-3">
                  {section && (
                    <div className="flex items-center space-x-3">
                      <span>{section}</span>
                      <svg
                        className="h-2.5 overflow-visible fill-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                      </svg>
                    </div>
                  )}
                  <div className="font-semibold text-gray-900 truncate dark:text-gray-200">
                    {title}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
