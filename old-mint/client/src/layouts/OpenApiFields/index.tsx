import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

import Authorizations from './Authorizations';
import Body from './Body';
import Parameters from './Parameters';
import Response from './Response';

export const MarkdownComponents = {
  p: ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className={clsx(['m-0', className])} />
  ),
};

function OpenApiFields() {
  return (
    <>
      <Authorizations />
      <Parameters />
      <Body />
      <Response />
    </>
  );
}

export default OpenApiFields;
