import React, { useContext } from 'react';

import { ConfigContext } from '@/context/ConfigContext';

import ExpandableFields from './OpenApiFields/ExpandableFields';

const OpenApiSchema = () => {
  const { apiReferenceData } = useContext(ConfigContext);
  if (apiReferenceData?.openApiSchemaData == undefined) return null;
  return <ExpandableFields schema={apiReferenceData.openApiSchemaData.schema} />;
};

export default OpenApiSchema;
