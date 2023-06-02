import React, { useContext } from 'react';

import { OpenApiData } from '@/api-reference/openapi';
import { ConfigContext } from '@/context/ConfigContext';

import { ParameterGroup } from './Parameters';

const Authorizations = () => {
  const { apiReferenceData } = useContext(ConfigContext);
  if (!apiReferenceData.isValidOpenApi && apiReferenceData.openApiData == undefined) {
    return null;
  }
  const { securityParameters } = apiReferenceData.openApiData as OpenApiData;
  if (securityParameters.length === 0) {
    return null;
  }

  return (
    <ParameterGroup
      id={'authorizations'}
      version={3}
      title="Authorizations"
      params={securityParameters}
      showLocation
    />
  );
};

export default Authorizations;
