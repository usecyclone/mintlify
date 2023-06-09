import { ReactElement } from 'react';

import { CodeBlockProps } from '@/components/Code/CodeBlock';
import { CodeGroup as GenericCodeGroup, CodeGroupProps } from '@/components/Code/CodeGroup';
import { Event } from '@/enums/events';
import { useAnalyticsContext } from '@/hooks/useAnalyticsContext';
import { useColors } from '@/hooks/useColors';

export function CodeGroup({
  children,
  isSmallText,
}: {
  children?: ReactElement<CodeBlockProps>[] | ReactElement<CodeBlockProps>;
  isSmallText?: boolean;
}) {
  const trackCodeBlockCopy = useAnalyticsContext(Event.CodeBlockCopy);
  const colors = useColors();
  return (
    <GenericCodeGroup
      selectedColor={colors.primaryLight}
      tooltipColor={colors.primaryDark}
      isSmallText={isSmallText}
      onCopied={(_, textToCopy) => trackCodeBlockCopy({ code: textToCopy })}
    >
      {children}
    </GenericCodeGroup>
  );
}

// Deprecated. Do not use SnippetGroup.
export function SnippetGroup(props: CodeGroupProps) {
  return <CodeGroup {...props} />;
}
