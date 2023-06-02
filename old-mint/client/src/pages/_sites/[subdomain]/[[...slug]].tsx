import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

import fetchStaticProps from '@/data-fetching/getStaticProps';
import { IS_MULTI_TENANT } from '@/env';
import { PageProps } from '@/types/page';
import Page from '@/ui/Page';

export interface PathProps extends ParsedUrlQuery {
  subdomain: string;
  slug: string[];
}

export const getStaticPaths: GetStaticPaths<PathProps> = async () => {
  if (!IS_MULTI_TENANT) {
    return {
      paths: [],
      fallback: false,
    };
  }
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<PageProps, PathProps> = async ({ params }) => {
  if (!IS_MULTI_TENANT) {
    return {
      notFound: true,
    };
  }
  if (!params) throw new Error('No path parameters found');

  return await fetchStaticProps(params);
};

export default Page;
