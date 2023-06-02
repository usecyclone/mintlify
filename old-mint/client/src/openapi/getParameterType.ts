// TODO: Call this function in a getStaticProps
export const getParameterType = (schema: {
  type?: string;
  format?: string;
}): string | undefined => {
  if (schema?.type === 'string' && schema?.format === 'binary') {
    return 'file';
  }
  return schema?.type;
};
