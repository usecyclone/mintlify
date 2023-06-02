import { MDXProvider } from '@mdx-js/react';
import { useContext } from 'react';

import { DynamicLink } from '@/components/DynamicLink';
import { Heading } from '@/components/Heading';
import { ConfigContext } from '@/context/ConfigContext';
import { useMDXContent } from '@/hooks/useMDXContent';
import { OpenApiResponseExample, OpenApiSchemaExample } from '@/layouts/ApiSupplemental';
import { ContentSideLayout } from '@/layouts/ContentSideLayout';
import { TableOfContents } from '@/ui/MDXContentController/TableOfContents';

export const SidePanel = () => {
  const { apiReferenceData } = useContext(ConfigContext);
  const [state] = useMDXContent();
  const {
    isWideSize,
    isApi,
    requestExample,
    responseExample,
    generatedRequestExamples,
    pageMetadata,
    currentTableOfContentsSection,
    tableOfContents,
  } = state;

  const renderExamples =
    isApi || requestExample || responseExample || apiReferenceData?.openApiSchemaData?.example;

  return (
    <MDXProvider components={{ a: DynamicLink, Heading }}>
      {!isWideSize ? (
        renderExamples ? (
          <ContentSideLayout sticky>
            <div className="flex flex-col gap-6 pb-6 w-[28rem]">
              {requestExample ?? generatedRequestExamples}
              {responseExample ??
                (pageMetadata.openapi && <OpenApiResponseExample openapi={pageMetadata.openapi} />)}
              <OpenApiSchemaExample />
            </div>
          </ContentSideLayout>
        ) : (
          <TableOfContents
            tableOfContents={tableOfContents}
            currentSection={currentTableOfContentsSection}
            meta={pageMetadata}
          />
        )
      ) : null}
    </MDXProvider>
  );
};
