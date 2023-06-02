import { useContext } from 'react';

import { ConfigContext } from '@/context/ConfigContext';
import { useMDXContent } from '@/hooks/useMDXContent';
import { OpenApiResponseExample, OpenApiSchemaExample } from '@/layouts/ApiSupplemental';
import { ApiPlayground } from '@/ui/ApiPlayground';

export const Api = () => {
  const { apiReferenceData } = useContext(ConfigContext);
  const [{ api, apiPlaygroundMode, generatedRequestExamples, responseExample, pageMetadata }] =
    useMDXContent();

  return (
    <>
      {api && apiPlaygroundMode !== 'hide' && <ApiPlayground />}
      {generatedRequestExamples ? (
        <div className="block xl:hidden mt-8">{generatedRequestExamples}</div>
      ) : null}
      {!responseExample && pageMetadata.openapi && (
        <div className="block xl:hidden mt-8">
          <OpenApiResponseExample openapi={pageMetadata.openapi} />
        </div>
      )}
      {apiReferenceData && apiReferenceData.openApiSchemaData && (
        <div className="block xl:hidden mt-8">
          <OpenApiSchemaExample />
        </div>
      )}
    </>
  );
};
