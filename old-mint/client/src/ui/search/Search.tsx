import { Combobox, Dialog, Transition } from '@headlessui/react';
import algoliasearch from 'algoliasearch';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import {
  Fragment,
  useState,
  useCallback,
  useRef,
  createContext,
  useContext,
  useEffect,
  ReactNode,
  Ref,
} from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { ConfigContext } from '@/context/ConfigContext';
import { VersionContext } from '@/context/VersionContext';
import { ContextDisplayNameEnum } from '@/enums/ContextDisplayNameEnum';
import { Event } from '@/enums/events';
import { useActionKey } from '@/hooks/useActionKey';
import { useAnalyticsContext } from '@/hooks/useAnalyticsContext';
import { zIndex } from '@/layouts/zIndex';
import { pathToBreadcrumbs } from '@/utils/paths/pathToBreadcrumbs';
import { pathToVersionDict } from '@/utils/paths/pathToVersionDict';

import Icon from '../Icon';
import { Chat } from './Chat';
import { Hit, SearchHit } from './HitLocation';

const client = algoliasearch('M6VUKXZ4U5', '60f283c4bc8c9feb5c44da3df3c21ce3');
const index = client.initIndex('docs');

type SearchInput = {
  key: string;
};

const SearchContext = createContext({
  isOpen: false,
  onOpen: () => {
    return;
  },
  onClose: () => {
    return;
  },
  // eslint-disable-next-line unused-imports/no-unused-vars
  onInput: (e: SearchInput) => {
    return;
  },
});
SearchContext.displayName = ContextDisplayNameEnum.SearchContext;

export function SearchProvider({
  subdomain,
  children,
}: {
  subdomain?: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const { mintConfig: config, navWithMetadata } = useContext(ConfigContext);
  const { selectedVersion } = useContext(VersionContext);
  const pathToVersion = pathToVersionDict(navWithMetadata ?? [], config ?? { name: '' });
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState<string>('');
  const [hits, setHits] = useState<Hit[]>([]);
  const [isChatMode, setIsChatMode] = useState(false);
  const trackSearchResultClick = useAnalyticsContext(Event.SearchResultClick);
  const trackChatEnter = useAnalyticsContext(Event.ChatEnter);
  const trackSearchClose = useAnalyticsContext(Event.SearchClose);
  const inputRef: Ref<HTMLInputElement> = useRef(null);

  useHotkeys('cmd+k', (e) => {
    e.preventDefault();
    setIsOpen(true);
  });

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onInput = useCallback(
    (e: SearchInput) => {
      setIsOpen(true);
    },
    [setIsOpen]
  );

  const onSearch = async (query: string) => {
    setQuery(query);
    // Search not available for local previews
    if (!query || subdomain == null) {
      setHits([]);
      return;
    }
    setQuery(query);

    const { hits } = await index.search(query, {
      filters: `orgID:${subdomain} OR customDomains:${subdomain}`,
      hitsPerPage: 100,
    });
    setHits(filterHitsToCurrentVersion(hits as Hit[], selectedVersion, pathToVersion));
  };

  const onSelectOption = (hit: 'chat' | Hit, query: string) => {
    if (hit === 'chat') {
      setIsChatMode(true);
      trackChatEnter({
        query,
      });
      return;
    }

    onClose();

    const section =
      hit._highlightResult.subheading?.matchLevel === 'full'
        ? `#${hit.subheading}`
        : hit._highlightResult.heading?.matchLevel === 'full'
        ? `#${hit.heading}`
        : '';
    const sectionSlug = section
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll(/[^a-zA-Z0-9-_#]/g, '');
    const pathToGo = `/${hit.slug}`;
    router.push(`${pathToGo}${sectionSlug}`);
    trackSearchResultClick({
      query,
      path: pathToGo,
      section: sectionSlug ? sectionSlug : undefined,
    });

    setQuery('');
    setHits([]);
  };

  // TODO: Enable for everyone
  const isChatEnabled = subdomain === 'mintlify' && query.length >= 6;

  const onSearchClose = () => {
    trackSearchClose({
      query,
      numHits: hits.length,
    });
  };

  return (
    <>
      <SearchContext.Provider
        value={{
          isOpen,
          onOpen,
          onClose,
          onInput,
        }}
      >
        {children}
      </SearchContext.Provider>
      {isOpen && (
        <Transition.Root
          show={isOpen}
          as={Fragment}
          afterLeave={() => {
            setQuery('');
            setHits([]);
          }}
          appear
        >
          <Dialog
            as="div"
            className={clsx(zIndex.Popup, 'relative')}
            onClose={(isOpen) => {
              setIsOpen(isOpen);
              setIsChatMode(false);
              onSearchClose();
              setQuery('');
              setHits([]);
            }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="mx-auto max-w-3xl transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-md bg-white dark:bg-background-dark shadow-2xl backdrop-blur backdrop-filter transition-all">
                  {isChatMode ? (
                    <Chat message={query} onBack={() => setIsChatMode(false)} onClose={onClose} />
                  ) : (
                    <Combobox
                      onChange={(option) => onSelectOption(option as unknown as Hit, query)}
                      value={query}
                    >
                      <div className="relative flex items-center">
                        <Icon
                          icon="magnifying-glass"
                          iconType="solid"
                          className="pointer-events-none absolute left-[1.2rem] h-4 w-4 bg-gray-700 dark:bg-gray-400"
                        />
                        <Combobox.Input
                          className="h-14 w-full border-0 bg-transparent pl-14 pr-6 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-0 focus:outline-none"
                          placeholder="Find or ask anything..."
                          onChange={(event) => onSearch(event.target.value)}
                        />
                      </div>
                      {query && (
                        <Combobox.Options static className="max-h-80 overflow-y-auto">
                          <div className={clsx(isChatEnabled || hits.length > 0 ? 'p-2' : null)}>
                            {isChatEnabled && (
                              <Combobox.Option
                                key="chat"
                                value="chat"
                                className={({ active }) =>
                                  clsx(
                                    'group flex cursor-pointer select-none items-center px-3 py-2.5 rounded-md w-full',
                                    active
                                      ? 'bg-primary-dark text-white dark:text-white'
                                      : 'text-gray-700 dark:text-gray-500'
                                  )
                                }
                              >
                                {({ active }) => (
                                  <div className="flex items-center space-x-4 text-sm">
                                    <div
                                      className={clsx(
                                        'rounded-md ring-1 ring-gray-900/5 shadow-sm group-hover:shadow group-hover:ring-gray-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none',
                                        active ? 'bg-white dark:bg-primary' : 'dark:bg-gray-800'
                                      )}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        className={clsx(
                                          'h-6 p-1 fill-primary-dark dark:group-hover:fill-white',
                                          active ? 'dark:fill-white' : 'dark:fill-primary'
                                        )}
                                      >
                                        <path d="M327.5 85.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 128l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 128l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 64 426.8 7.5C425.1 3 420.8 0 416 0s-9.1 3-10.8 7.5L384 64 327.5 85.2zM9.3 240C3.6 242.6 0 248.3 0 254.6s3.6 11.9 9.3 14.5L26.3 277l8.1 3.7 .6 .3 88.3 40.8L164.1 410l.3 .6 3.7 8.1 7.9 17.1c2.6 5.7 8.3 9.3 14.5 9.3s11.9-3.6 14.5-9.3l7.9-17.1 3.7-8.1 .3-.6 40.8-88.3L346 281l.6-.3 8.1-3.7 17.1-7.9c5.7-2.6 9.3-8.3 9.3-14.5s-3.6-11.9-9.3-14.5l-17.1-7.9-8.1-3.7-.6-.3-88.3-40.8L217 99.1l-.3-.6L213 90.3l-7.9-17.1c-2.6-5.7-8.3-9.3-14.5-9.3s-11.9 3.6-14.5 9.3l-7.9 17.1-3.7 8.1-.3 .6-40.8 88.3L35.1 228.1l-.6 .3-8.1 3.7L9.3 240zm83 14.5l51.2-23.6c10.4-4.8 18.7-13.1 23.5-23.5l23.6-51.2 23.6 51.2c4.8 10.4 13.1 18.7 23.5 23.5l51.2 23.6-51.2 23.6c-10.4 4.8-18.7 13.1-23.5 23.5l-23.6 51.2-23.6-51.2c-4.8-10.4-13.1-18.7-23.5-23.5L92.3 254.6zM384 384l-56.5 21.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 448l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 448l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 384l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L384 384z" />
                                      </svg>
                                    </div>
                                    <div
                                      className={clsx(
                                        active
                                          ? 'text-white'
                                          : 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark'
                                      )}
                                    >
                                      <span className="font-medium">Ask {config?.name}: </span>
                                      <span
                                        className={clsx(
                                          active ? 'text-white' : 'text-gray-800 dark:text-gray-300'
                                        )}
                                      >
                                        {query}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </Combobox.Option>
                            )}
                            {hits.length > 0 && (
                              <>
                                <li className="scroll-py-2 divide-y divide-gray-500 divide-opacity-10">
                                  <ul className="text-sm">
                                    {hits.map((hit: Hit) => (
                                      <Combobox.Option
                                        key={hit.objectID}
                                        value={hit}
                                        className={({ active }) =>
                                          clsx(
                                            'group flex cursor-pointer select-none items-center px-3 py-2 rounded-md w-full',
                                            active
                                              ? 'bg-primary-dark text-white dark:text-white'
                                              : 'text-gray-700 dark:text-gray-400'
                                          )
                                        }
                                      >
                                        {({ active }) => (
                                          <SearchHit
                                            active={active}
                                            hit={hit}
                                            breadcrumbs={pathToBreadcrumbs(hit.slug, config)}
                                          />
                                        )}
                                      </Combobox.Option>
                                    ))}
                                  </ul>
                                </li>
                              </>
                            )}
                          </div>
                        </Combobox.Options>
                      )}
                    </Combobox>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
}

export function SearchButton({
  className,
  children,
}: {
  className: string;
  children: ReactNode | ((props: { actionKey: string[] | undefined }) => ReactNode);
}) {
  const searchButtonRef = useRef();
  const actionKey = useActionKey();
  const { onOpen, onInput } = useContext(SearchContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (searchButtonRef && searchButtonRef.current === document.activeElement && onInput) {
        if (event.key.match(/[a-z0-9]/i)) {
          onInput(event);
        }
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onInput, searchButtonRef]);

  return (
    <button type="button" ref={searchButtonRef.current} onClick={onOpen} className={className}>
      {typeof children === 'function' ? children({ actionKey }) : children}
    </button>
  );
}

function filterHitsToCurrentVersion(
  hits: Hit[],
  selectedVersion: string,
  pathToVersion: Record<string, string>
): Hit[] {
  return hits.filter((hit) => {
    const version = pathToVersion[hit.slug];

    // Pages without versioning are always included
    if (!version) {
      return true;
    }

    return version === selectedVersion;
  });
}
