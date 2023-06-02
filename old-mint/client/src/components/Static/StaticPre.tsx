import { StaticContent, StaticContentProps } from './StaticContent';

export const StaticPre = (props: StaticContentProps<'pre'>) => (
  <StaticContent as={'pre'} {...props} />
);
