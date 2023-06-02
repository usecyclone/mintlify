import { MDXRemoteSerializeResult } from 'next-mdx-remote/dist/types';

import { ApiReferenceData } from '@/api-reference/getRelevantApiReferenceInfo';
import type { Config } from '@/types/config';
import { FaviconsProps } from '@/types/favicons';
import { Groups, PageMetaTags } from '@/types/metadata';
import { OpenApiFile } from '@/types/openApi';

export interface PageProps {
  mdxSource: MDXRemoteSerializeResult;
  pageData: PageDataProps;
  favicons: FaviconsProps;
  subdomain?: string;
  internalAnalyticsWriteKey?: string;
  hiddenPages?: string[];
}

export interface PageDataProps {
  navWithMetadata: Groups;
  pageMetadata: PageMetaTags;
  mintConfig: Config;
  openApiFiles?: OpenApiFile[];
  apiReferenceData: ApiReferenceData;
}
