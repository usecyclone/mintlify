import { Dialog } from '@headlessui/react';
import clsx from 'clsx';
import isAbsoluteUrl from 'is-absolute-url';
import { ReactNode, useContext, Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

import { ConfigContext } from '@/context/ConfigContext';
import { VersionContext } from '@/context/VersionContext';
import { ContextDisplayNameEnum } from '@/enums/ContextDisplayNameEnum';
import { useCurrentPath } from '@/hooks/useCurrentPath';
import { zIndex } from '@/layouts/zIndex';
import { Anchor, Config } from '@/types/config';
import { PageMetaTags, Groups } from '@/types/metadata';
import { getGroupsInDivision, getGroupsInVersion, getGroupsNotInDivision } from '@/utils/nav';
import { optionallyRemoveLeadingSlash } from '@/utils/paths/leadingSlashHelpers';

import { Nav } from './Nav';

type SidebarContextType = {
  navIsOpen: boolean;
  setNavIsOpen: (navIsOpen: boolean) => void;
};

export const SidebarContext = createContext<SidebarContextType>({
  navIsOpen: false,
  setNavIsOpen: () => {
    return;
  },
});
SidebarContext.displayName = ContextDisplayNameEnum.SidebarContext;

function Wrapper({
  allowOverflow,
  children,
}: {
  allowOverflow: boolean;
  children: React.ReactChild;
}) {
  return <div className={allowOverflow ? undefined : 'overflow-hidden'}>{children}</div>;
}

export function SidebarLayout({
  navIsOpen,
  setNavIsOpen,
  navWithMetadata,
  pageMetadata,
  children,
}: {
  navIsOpen: boolean;
  setNavIsOpen: Dispatch<SetStateAction<boolean>>;
  navWithMetadata: Groups;
  pageMetadata: PageMetaTags;
  children: ReactNode;
}) {
  const { mintConfig } = useContext(ConfigContext);
  const { selectedVersion } = useContext(VersionContext);

  const navForDivision = getNavForDivision(navWithMetadata, mintConfig, useCurrentPath());
  const navForDivisionInVersion = getGroupsInVersion(navForDivision, selectedVersion);

  return (
    <SidebarContext.Provider value={{ navIsOpen, setNavIsOpen }}>
      <Wrapper allowOverflow>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
          <div
            className={clsx(
              zIndex.SideBar,
              'hidden lg:block fixed top-[4rem] bottom-0 right-auto w-[18rem] pl-4 pr-6 pb-10 overflow-y-auto stable-scrollbar-gutter'
            )}
          >
            <Nav nav={navForDivisionInVersion} pageMetadata={pageMetadata} />
          </div>
          <div className="lg:pl-[20rem]">{children}</div>
        </div>
      </Wrapper>
      <Dialog
        as="div"
        open={navIsOpen}
        onClose={() => setNavIsOpen(false)}
        className={clsx(zIndex.Popup, 'fixed inset-0 overflow-y-auto lg:hidden')}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-background-dark/80" />
        <div className="relative bg-white w-[19rem] min-h-full py-7 px-8 dark:bg-background-dark">
          <button
            type="button"
            onClick={() => setNavIsOpen(false)}
            className={clsx(
              zIndex.Control,
              'absolute top-5 right-5 w-8 h-8 flex items-center justify-center fill-gray-500 hover:fill-gray-600 dark:fill-gray-400 dark:hover:fill-gray-300'
            )}
          >
            <span className="sr-only">Close navigation</span>
            <svg
              className="w-3.5 overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z" />
            </svg>
          </button>
          <Nav nav={navForDivisionInVersion} pageMetadata={pageMetadata} mobile={true} />
        </div>
      </Dialog>
    </SidebarContext.Provider>
  );
}

function getNavForDivision(nav: Groups, mintConfig: Config | undefined, currentPath: string) {
  const currentPathNoLeadingSlash = optionallyRemoveLeadingSlash(currentPath);

  const currentDivision = mintConfig?.anchors?.find((anchor: Anchor) =>
    currentPathNoLeadingSlash.startsWith(anchor.url)
  );

  let navForDivision = getGroupsInDivision(nav, currentDivision?.url ? [currentDivision?.url] : []);

  if (navForDivision.length === 0) {
    // Base docs include everything NOT in an anchor
    const divisions =
      mintConfig?.anchors?.filter((anchor: Anchor) => !isAbsoluteUrl(anchor.url)) || [];
    navForDivision = getGroupsNotInDivision(
      nav,
      divisions.map((division: Anchor) => division.url)
    );
  }

  return navForDivision;
}
