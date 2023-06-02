import type { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote/dist/types';
import { join } from 'path';
import type { ParsedUrlQuery } from 'querystring';

import fetchStaticProps, { StaticProps } from '@/data-fetching/getStaticProps';
import { IS_PASSWORD_PROTECTED, SUBDOMAIN } from '@/env';
import { getLocalPageProps, PagePropType } from '@/lib/local/page';
import { getPaths } from '@/lib/local/paths';
import { getPasswordProtectedPaths } from '@/lib/passwordProtectedPaths';
import createSnippetTreeMap from '@/mdx/createSnippetTreeMap';
import getMdxSource from '@/mdx/getMdxSource';
import type { Config } from '@/types/config';
import { FaviconsProps } from '@/types/favicons';
import { Groups, PageMetaTags } from '@/types/metadata';
import { OpenApiFile } from '@/types/openApi';
import { PageProps } from '@/types/page';
import { Snippet } from '@/types/snippet';
import Page from '@/ui/Page';
import { pickRedirect } from '@/utils/staticProps/pickRedirect';
import { prepareToSerialize } from '@/utils/staticProps/prepareToSerialize';

interface PathProps extends ParsedUrlQuery {
  slug: string[];
}

export const getStaticPaths: GetStaticPaths<PathProps> = async () => {
  let paths: {
    params: {
      slug: string[];
    };
  }[] = [];
  if (IS_PASSWORD_PROTECTED) {
    paths = await getPasswordProtectedPaths();
  } else {
    paths = await getPaths(join('src/_props'));
  }
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<PageProps, PathProps> = async ({ params }) => {
  if (!params) throw new Error('No path parameters found');

  if (IS_PASSWORD_PROTECTED && SUBDOMAIN) {
    return await fetchStaticProps({ ...params, subdomain: SUBDOMAIN });
  } else {
    const { slug } = params;
    const slugStr = slug ? slug.join('/') : 'index'; // TODO index logic

    const localStaticProps = await getLocalStaticProps(slugStr);

    if (localStaticProps) {
      return localStaticProps;
    } else {
      return PageNotFound;
    }
  }
};

const PageNotFound: { notFound: true } = { notFound: true };

const getLocalStaticProps = async (slug: string): Promise<StaticProps> => {
  const data: PagePropType = await getLocalPageProps(slug);

  if (data.hasOwnProperty('notFound')) {
    return PageNotFound;
  }

  // Only returns navWithMetadata when we need to redirect
  if (data.hasOwnProperty('navWithMetadata')) {
    const { navWithMetadata } = data as {
      navWithMetadata: Groups;
    };
    if (Array.isArray(navWithMetadata) && navWithMetadata.length > 0) {
      const { destination } = pickRedirect(navWithMetadata, slug);
      if (destination) {
        return { redirect: { destination, permanent: false } };
      }
    }

    console.warn('Could not find a page to redirect to.');
    return {
      notFound: true,
    };
  }
  if (
    data.hasOwnProperty('content') &&
    data.hasOwnProperty('pageData') &&
    data.hasOwnProperty('favicons')
  ) {
    try {
      const { content, pageData, favicons, snippets } = data as {
        content: string;
        pageData: {
          mintConfig: Config;
          navWithMetadata: Groups;
          pageMetadata: PageMetaTags;
          openApiFiles?: OpenApiFile[];
        };
        snippets: Snippet[];
        favicons: FaviconsProps;
      };
      let mdxSource: MDXRemoteSerializeResult;
      const { pageMetadata } = pageData;
      const snippetTreeMap = await createSnippetTreeMap(snippets ?? []);
      try {
        mdxSource = await getMdxSource(
          content,
          {
            pageMetadata,
          },
          snippetTreeMap
        );
      } catch (err) {
        mdxSource = await getMdxSource('🚧 A parsing error occured.', { pageMetadata }); // placeholder content for when there is a syntax error.
        console.log(`⚠️ Warning: MDX failed to parse page ${slug}: `, err);
      }
      return {
        props: prepareToSerialize({
          mdxSource,
          pageData,
          favicons,
        }),
      };
    } catch (err) {
      console.warn(err);
      return PageNotFound;
    }
  }
  return PageNotFound;
};

export default Page;
