import Link from 'next/link';
import posthog from 'posthog-js';
import React, { useContext } from 'react';

import { ConfigContext } from '@/context/ConfigContext';
import { useMDXContent } from '@/hooks/useMDXContent';
import { usePrevNext } from '@/hooks/usePrevNext';
import { getSidebarTitle } from '@/utils/getAllMetaTags';

import Icon from '../Icon';

type SocialProps = {
  type?: string;
  url: string;
};

const Social = ({ type, url }: SocialProps) => {
  const icon = type === 'website' || type == null ? 'earth-americas' : type;
  if (
    icon !== 'earth-americas' &&
    icon !== 'discord' &&
    icon !== 'facebook' &&
    icon !== 'slack' &&
    icon !== 'twitter' &&
    icon !== 'github' &&
    icon !== 'linkedin' &&
    icon !== 'instagram' &&
    icon !== 'youtube' &&
    icon !== 'medium' &&
    icon !== 'hacker-news' &&
    icon !== 'telegram'
  ) {
    return null;
  }

  return (
    <a href={url}>
      <span className="sr-only">{type}</span>
      <Icon
        icon={icon}
        iconType="solid"
        className="h-5 w-5 bg-gray-400 dark:bg-gray-500 hover:bg-gray-500 dark:hover:bg-gray-400"
      />
    </a>
  );
};

export function Footer() {
  const { mintConfig, subdomain } = useContext(ConfigContext);
  const [{ pageMetadata }] = useMDXContent();
  const { prev, next: n } = usePrevNext();
  const previous = pageMetadata.hideFooterPagination ? null : prev;
  const next = pageMetadata.hideFooterPagination ? null : n;
  return (
    <footer className="mt-14 leading-6">
      {(previous || next) && (
        <div className="mb-12 flex items-center text-sm font-semibold text-gray-700 dark:text-gray-200">
          {previous && (
            <Link href={previous?.href as never} className="group space-x-3 flex items-center">
              <svg
                viewBox="0 0 3 6"
                className="h-1.5 stroke-gray-400 overflow-visible group-hover:stroke-gray-600 dark:group-hover:stroke-gray-300"
              >
                <path
                  d="M3 0L0 3L3 6"
                  fill="none"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <span className="group-hover:text-gray-900 dark:group-hover:text-white">
                {getSidebarTitle(previous)}
              </span>
            </Link>
          )}
          {next && (
            <Link href={next?.href as never} className="group ml-auto space-x-3 flex items-center">
              <span className="group-hover:text-gray-900 dark:group-hover:text-white">
                {getSidebarTitle(next)}
              </span>
              <svg
                viewBox="0 0 3 6"
                className="rotate-180 h-1.5 stroke-gray-400 overflow-visible group-hover:stroke-gray-600 dark:group-hover:stroke-gray-300"
              >
                <path
                  d="M3 0L0 3L3 6"
                  fill="none"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </Link>
          )}
        </div>
      )}
      <div className="pt-10 border-t border-gray-100 sm:flex justify-between dark:border-gray-800 pb-28">
        <div className="flex space-x-6 mb-6 sm:mb-0">
          {mintConfig?.footerSocials &&
            Array.isArray(mintConfig.footerSocials) &&
            mintConfig.footerSocials.map((social) => (
              <Social key={social.url} url={social.url} type={social?.type} />
            ))}
          {mintConfig?.footerSocials &&
            typeof mintConfig.footerSocials === 'object' &&
            Object.entries(mintConfig.footerSocials).map(([socialType, socialUrl]) => (
              <Social key={socialUrl} url={socialUrl} type={socialType} />
            ))}
        </div>
        {!mintConfig?.isWhiteLabeled && (
          <div className="sm:flex">
            <a
              href={`https://mintlify.com?utm_campaign=poweredBy&utm_medium=docs&utm_source=${subdomain}`}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
              onClick={() => {
                posthog.capture('powered_by_mintlify.click', {
                  subdomain,
                });
              }}
            >
              Powered by Mintlify
            </a>
          </div>
        )}
      </div>
    </footer>
  );
}
