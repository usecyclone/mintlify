import { useContext, useEffect, useState, useMemo } from 'react';

import { ConfigContext } from '@/context/ConfigContext';
import { useCurrentPath } from '@/hooks/useCurrentPath';
import IconButton, { FeedbackButtonIconType } from '@/ui/Feedback/IconButton';

const removeFirstSlash = (str: string): string => {
  if (str[0] === '/') {
    return str.substring(1);
  }

  return str;
};

export function UserFeedback() {
  const path = useCurrentPath();
  const { mintConfig } = useContext(ConfigContext);

  const [createIssueHref, setCreateIssueHref] = useState<string | null>(null);
  const [createSuggestHref, setCreateSuggestHref] = useState<string | null>(null);

  useEffect(() => {
    if (path && mintConfig?.repo?.github && !mintConfig.repo.github.isPrivate) {
      const {
        owner,
        repo,
        deployBranch,
        contentDirectory: deploymentPath,
      } = mintConfig.repo.github;

      let urlPath;
      if (!deploymentPath) {
        urlPath = '';
      } else {
        urlPath = `${deploymentPath}/`;
      }

      setCreateSuggestHref(
        `https://github.com/${owner}/${repo}/edit/${deployBranch}/${urlPath}${removeFirstSlash(
          `${path}.mdx`
        )}`
      );

      const issueTitle = 'Issue on docs';
      const body = `Path: ${path}`;

      setCreateIssueHref(
        `https://github.com/${owner}/${repo}/issues/new?title=${issueTitle}&body=${body}`
      );
    }
  }, [path, mintConfig]);

  const feedbackButtons = useMemo(() => {
    const buttons = [];

    if (mintConfig?.feedback?.suggestEdit && createSuggestHref) {
      buttons.push(
        <IconButton
          type={FeedbackButtonIconType.Edit}
          tooltip="Edit this page"
          href={createSuggestHref}
          className="relative w-fit flex items-center p-1.5 group"
        />
      );
    }

    if (mintConfig?.feedback?.raiseIssue && createIssueHref) {
      buttons.push(
        <IconButton
          type={FeedbackButtonIconType.Alert}
          href={createIssueHref}
          tooltip="Raise an issue"
          className="relative w-fit flex items-center p-1.5 group fill-gray-500 dark:fill-gray-400 hover:fill-gray-700 dark:hover:fill-gray-200 dark:hover:text-gray-300"
        />
      );
    }

    return buttons;
  }, [mintConfig, createSuggestHref, createIssueHref]);

  if (feedbackButtons.length === 0) {
    return null;
  }

  return <div className="flex items-center space-x-2">{feedbackButtons}</div>;
}
