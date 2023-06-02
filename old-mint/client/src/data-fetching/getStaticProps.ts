import axios, { AxiosError } from 'axios';
import { MDXRemoteSerializeResult } from 'next-mdx-remote/dist/types';

import getRelevantApiReferenceInfo from '@/api-reference/getRelevantApiReferenceInfo';
import { AUTH_HEADER, DEPLOYMENT_ENDPOINT } from '@/constants';
import { getHiddenPages } from '@/data-fetching/getHiddenPages';
import { INTERNAL_ANALYTICS_WRITE_KEY, IS_PASSWORD_PROTECTED } from '@/env';
import { BASE_PATH } from '@/env';
import createSnippetTreeMap from '@/mdx/createSnippetTreeMap';
import getMdxSource from '@/mdx/getMdxSource';
import { PathProps } from '@/pages/_sites/[subdomain]/[[...slug]]';
import type { Config } from '@/types/config';
import { FaviconsProps } from '@/types/favicons';
import { Groups, PageMetaTags } from '@/types/metadata';
import { OpenApiFile } from '@/types/openApi';
import { PageProps } from '@/types/page';
import { PageDataProps } from '@/types/page';
import { Snippet } from '@/types/snippet';
import { pickRedirect } from '@/utils/staticProps/pickRedirect';
import { prepareToSerialize } from '@/utils/staticProps/prepareToSerialize';

export type StaticProps =
  | { notFound: true }
  | { redirect: { destination: string; permanent: boolean } }
  | { props: PageProps };

const getStaticProps = async (params: PathProps): Promise<StaticProps> => {
  const { subdomain, slug } = params;
  const path = slug ? slug.join('/') : 'index';

  const { data, status } = await getPageProps(subdomain, path);

  // We put this check in case 200 status codes are sending invalid data.
  if (data == null) {
    throw 'Page data is missing at path: ' + path + ' for subdomain: ' + subdomain;
  }
  if (data.redirect) {
    const { navWithMetadata }: { navWithMetadata: Groups } = data;
    if (Array.isArray(navWithMetadata) && navWithMetadata.length > 0) {
      const { destination, permanent } = pickRedirect(navWithMetadata, path);
      if (destination) {
        return { redirect: { destination, permanent } };
      }
    }
    throw 'Could not find a page to redirect to at path: ' + path + ' for subdomain: ' + subdomain;
  }

  // The server providing data to static props only sends 400 and 403 when there is no data at all
  // for the subdomain.
  if (status === 400 || status === 403) {
    return {
      notFound: true,
    };
  }

  if (status === 200) {
    const {
      content,
      mintConfig,
      navWithMetadata,
      pageMetadata,
      openApiFiles,
      favicons,
      snippets,
    }: {
      content: string;
      mintConfig: Config;
      navWithMetadata: Groups;
      pageMetadata: PageMetaTags;
      openApiFiles?: OpenApiFile[];
      favicons: FaviconsProps;
      snippets: Snippet[];
    } = data;
    const snippetTreeMap = await createSnippetTreeMap(snippets ?? []);
    let mdxSource: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>;

    try {
      mdxSource = await getMdxSource(
        content,
        {
          pageMetadata,
        },
        snippetTreeMap
      );
    } catch (err) {
      mdxSource = await getMdxSource(
        '🚧 A parsing error occured. Please contact the owner of this website. They can use the Mintlify CLI to test this website locally and see the errors that occur.',
        { pageMetadata }
      ); // placeholder content for when there is a syntax error.
      console.log(`⚠️ Warning: MDX failed to parse page ${path}: `, err);
    }

    // TO DO: Move to the metadata function when we migrate to the app directory.
    // We use the hidden pages to generate a noindex meta tag for pages that are hidden.
    const hiddenPages = await getHiddenPages(subdomain);

    const apiReferenceData = getRelevantApiReferenceInfo(pageMetadata, openApiFiles);

    const pageData: PageDataProps = {
      navWithMetadata,
      pageMetadata,
      mintConfig,
      openApiFiles,
      apiReferenceData,
    };

    return {
      props: prepareToSerialize({
        mdxSource,
        pageData,
        favicons,
        subdomain,
        internalAnalyticsWriteKey: INTERNAL_ANALYTICS_WRITE_KEY,
        hiddenPages,
      }),
    };
  }
  return {
    notFound: true,
  };
};

const getPageProps = async (subdomain: string, path: string) => {
  const privatePath = IS_PASSWORD_PROTECTED ? '/private/' : '/';
  try {
    const { data, status } = await axios.get(
      `${DEPLOYMENT_ENDPOINT}${privatePath}${subdomain}/static-props`,
      {
        params: {
          path,
          basePath: BASE_PATH,
        },
        headers: AUTH_HEADER,
      }
    );
    return { data, status };
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError?.response?.status === 403) {
      console.warn(
        'Attempted to fetch props for subdomain',
        subdomain,
        'but the request was forbidden (403).'
      );
    }

    // Show a 404 page instead of crashing
    if (axiosError?.response?.status === 400 || axiosError?.response?.status === 403) {
      return { data: {}, status: axiosError?.response.status };
    } else {
      throw error;
    }
  }
};

export default getStaticProps;
