import { ReactNode } from 'react';

import { PageMetaTags } from '@/types/metadata';
import { TableOfContentsSection } from '@/types/tableOfContentsSection';
import { ApiComponent } from '@/ui/ApiPlayground';
import { OpenApiPlaygroundProps } from '@/ui/MDXContentController/getOpenApiPlaygroundProps';
import { Param } from '@/utils/api';

export type ContentWidthType = { contentWidth: string; isWideSize: boolean };

export type ApiPlaygroundType = {
  apiPlaygroundMode: string;
  generatedRequestExamples: any;
  api: string;
};

export type ParamGroupsType = {
  paramGroupDict: Record<string, Param[]>;
  paramGroups: { name: string; params: Param[] }[];
};

export type HeadingType = {
  id?: string;
  top?: number;
};

export type MDXContentControllerState = {
  apiBaseIndex: number;
  apiComponents: ApiComponent[];
  openApiPlaygroundProps: OpenApiPlaygroundProps;
  pageMetadata: PageMetaTags;
  selectedBodyContentType?: string;
  selectedResponseContentType?: string;
  isApi: boolean;
  requestExample?: ReactNode;
  responseExample?: ReactNode;
  apiPlaygroundInputs: Record<string, any>;
  tableOfContents: TableOfContentsSection[];
  headings: HeadingType[];
  currentTableOfContentsSection: string | undefined;
};

export type MDXContentState = MDXContentControllerState &
  ApiPlaygroundType &
  ParamGroupsType &
  ContentWidthType;
