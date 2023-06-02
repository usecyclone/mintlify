import { MDXComponents } from 'mdx/types';

import { StaticCode } from './StaticCode';
import { StaticContent } from './StaticContent';
import { StaticPre } from './StaticPre';
import { StaticSpan } from './StaticSpan';

/**
 * These components are used to silence hydration errors on static content.
 * See https://github.com/mintlify/mint/pull/407 for more information.
 */
export { StaticContent, StaticCode, StaticPre, StaticSpan };
export const staticComponents: MDXComponents = {
  pre: StaticPre,
  code: StaticCode,
  span: StaticSpan,
};
