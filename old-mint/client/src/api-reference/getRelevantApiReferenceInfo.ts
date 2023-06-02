import { getOpenApiData, OpenApiData } from '@/api-reference/openapi';
import { PageMetaTags } from '@/types/metadata';
import { OpenApiFile } from '@/types/openApi';

import { getOpenApiSchemaData, OpenApiSchemaData } from './openapi/schema';

export type ApiReferenceData = {
  isApi: boolean;
  isValidOpenApi: boolean;
  openApiData?: OpenApiData;
  openApiSchemaData?: OpenApiSchemaData;
};

const getRelevantApiReferenceInfo = (
  pageMetadata: PageMetaTags,
  openApiFiles?: OpenApiFile[]
): ApiReferenceData => {
  // TODO: Check if we should check the openapi metadata for the isApi check
  // const getIsApi = useCallback(
  //   ({ api }: PageMetaTags, props: OpenApiPlaygroundProps | undefined) =>
  //     (api?.length ?? 0) > 0 || (props?.api?.length ?? 0) > 0,
  //   []
  // );
  const isApi = (pageMetadata?.api?.length ?? 0) > 0; // || (props?.api?.length ?? 0) > 0
  const openApiFilesExist = Array.isArray(openApiFiles) && openApiFiles.length > 0;
  const openapiMetadataExists =
    typeof pageMetadata?.openapi === 'string' && pageMetadata?.openapi?.length > 0;
  let isValidOpenApi = false;
  let openApiData: OpenApiData | undefined = undefined;
  if (openapiMetadataExists && openApiFilesExist) {
    const possiblyOpenApiData = getOpenApiData(pageMetadata.openapi as string, openApiFiles);
    isValidOpenApi = possiblyOpenApiData.isValidOpenApi;
    openApiData = possiblyOpenApiData.openApiData;
  }
  const openApiSchemaMetadataExists =
    typeof pageMetadata?.['openapi-schema'] === 'string' &&
    pageMetadata?.['openapi-schema']?.length > 0;
  let openApiSchemaData: OpenApiSchemaData | undefined = undefined;
  if (openApiSchemaMetadataExists && openApiFilesExist) {
    openApiSchemaData = getOpenApiSchemaData(
      pageMetadata?.['openapi-schema'] as string,
      openApiFiles
    );
  }

  return {
    isApi,
    isValidOpenApi,
    openApiData,
    openApiSchemaData,
  };
};

export default getRelevantApiReferenceInfo;
