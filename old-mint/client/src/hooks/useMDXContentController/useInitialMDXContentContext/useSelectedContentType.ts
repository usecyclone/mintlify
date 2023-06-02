import { useMemo } from 'react';

import { OpenApiPlaygroundProps } from '@/ui/MDXContentController/getOpenApiPlaygroundProps';

export const useSelectedContentType = (openApiProps: OpenApiPlaygroundProps) =>
  useMemo(
    () => openApiProps?.apiComponentsByContentType?.map(({ contentType }) => contentType)[0],
    [openApiProps?.apiComponentsByContentType]
  );
