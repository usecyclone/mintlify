import ReactMarkdown from 'react-markdown';

import { useCurrentPath } from '@/hooks/useCurrentPath';
import { PageMetaTags } from '@/types/metadata';
import { UserFeedback } from '@/ui/Feedback/Feedback';
import { slugToTitle } from '@/utils/titleText/slugToTitle';

type PageHeaderProps = {
  section: string;
  pageMetadata: PageMetaTags;
};

export function PageHeader({ section, pageMetadata }: PageHeaderProps) {
  const currentPath = useCurrentPath();
  const title = pageMetadata.title || slugToTitle(currentPath);
  const { description } = pageMetadata;
  if (!title && !description) return null;

  return (
    <header id="header" className="relative">
      <div className="mt-0.5 space-y-2.5">
        <div className="flex h-5">
          {section && (
            <div className="flex-1 text-primary dark:text-primary-light text-sm font-semibold">
              {section}
            </div>
          )}
          <UserFeedback />
        </div>
        <div className="flex items-center">
          <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight dark:text-gray-200">
            {title}
          </h1>
        </div>
      </div>
      {description && (
        <div className="mt-2 text-lg prose prose-gray dark:prose-dark">
          <Description>{description}</Description>
        </div>
      )}
    </header>
  );
}

const hasIncludesMarkdown = (str: string) => {
  return /(?:__|[*#])|\[(.*?)\]\(.*?\)/.test(str) || /\`([^\`].*?)\`/.test(str);
};

// TODO: Fully deprecate for getStaticProps rendering of MDX content
function Description({ children }: { children: string | Element }) {
  /* TODO: Generate via static props */
  if (typeof children === 'string' && hasIncludesMarkdown(children)) {
    return <ReactMarkdown>{children}</ReactMarkdown>;
  }

  return <>{children}</>;
}
