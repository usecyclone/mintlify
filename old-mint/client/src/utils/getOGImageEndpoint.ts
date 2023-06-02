import { Anchor, Config } from '@/types/config';
import { Group, GroupPage, PageMetaTags } from '@/types/metadata';

import { getTitle } from './getAllMetaTags';

const findActiveDivision = (path: string, anchors?: Anchor[]): string => {
  const activeAnchor = anchors?.find((anchor) => {
    return path.startsWith(`/${anchor.url}/`);
  });

  if (activeAnchor) {
    return activeAnchor.name;
  }

  return 'Documentation';
};

const findActiveGroupPage = (path: string, groupPage: GroupPage): string | void => {
  for (const page of groupPage.pages) {
    if (page.href === path) {
      return groupPage.group;
    }
    if (page.pages) {
      return findActiveGroupPage(path, page);
    }
  }
};

const findActiveGroup = (path: string, nav: Group[]): string | void => {
  for (const group of nav) {
    const foundGroup = findActiveGroupPage(path, group);
    if (foundGroup) {
      return foundGroup;
    }
  }
};

export function getOGImageEndpoint(
  origin: string,
  pageMetadata: PageMetaTags,
  mintConfig: Config,
  navWithMetadata: Group[],
  path: string
): string {
  // Fallback to Mintlify's hosted endpoint for search engines that don't support JavaScript.
  const imageEndpoint = new URL(`${origin || 'https://mintlify.com/docs'}/api/og`);
  const titleParam = getTitle(pageMetadata);

  const setQueryParamIfExists = (param: string, value: string | undefined | void) => {
    if (value) {
      imageEndpoint.searchParams.set(param, value);
    }
  };

  const division = findActiveDivision(path, mintConfig.anchors);
  const group = findActiveGroup(path, navWithMetadata);

  setQueryParamIfExists('division', division);
  setQueryParamIfExists('section', group);

  setQueryParamIfExists('mode', mintConfig.modeToggle?.default);

  setQueryParamIfExists('title', titleParam);
  setQueryParamIfExists('description', pageMetadata.description);

  if (typeof mintConfig.logo === 'string') {
    setQueryParamIfExists('logoLight', mintConfig.logo);
    setQueryParamIfExists('logoDark', mintConfig.logo);
  } else {
    setQueryParamIfExists('logoLight', mintConfig.logo?.light);
    setQueryParamIfExists('logoDark', mintConfig.logo?.dark);
  }

  setQueryParamIfExists('primaryColor', mintConfig.colors?.primary);
  setQueryParamIfExists('lightColor', mintConfig.colors?.light);
  setQueryParamIfExists('darkColor', mintConfig.colors?.dark);

  return imageEndpoint.toString();
}

const MAX_DESCRIPTION_CHARS = 105;

export const truncateThumbnailDescription = (description: string | null) => {
  if (!description || description.length < MAX_DESCRIPTION_CHARS) {
    return description;
  }

  if (description.includes('. ')) {
    return description.split('. ')[0];
  }

  return `${description?.substring(0, MAX_DESCRIPTION_CHARS)}...`;
};
