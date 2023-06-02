import { StaticContent, StaticContentProps } from './StaticContent';

export const StaticSpan = (props: StaticContentProps<'span'>) => (
  <StaticContent as={'span'} {...props} />
);
