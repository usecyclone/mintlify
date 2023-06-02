import { StaticContent, StaticContentProps } from './StaticContent';

export const StaticCode = (props: StaticContentProps<'code'> & { inline?: boolean }) => (
  <StaticContent as={'code'} {...props} />
);
