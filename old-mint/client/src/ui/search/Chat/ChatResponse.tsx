import { gql, useSubscription } from '@apollo/client';
import ReactMarkdown from 'react-markdown';

const NEW_SESSION_CHAT_RESULT = gql`
  subscription OnNewSessionChatResult($messageInput: String!, $organizationId: ID!) {
    newSessionChatResult(input: { messageInput: $messageInput, organizationId: $organizationId }) {
      isEnd
      sessionId
      message {
        id
        content
        citations {
          citationNumber
          title
          url
          rootRecordId
          rootRecordType
        }
      }
    }
  }
`;

const CONTINUE_SESSION_CHAT_RESULT = gql`
  subscription OnContinueSessionChatResult($messageInput: String!, $sessionId: ID!) {
    continueChatResult(input: { messageInput: $messageInput, sessionId: $sessionId }) {
      isEnd
      sessionId
      message {
        id
        content
        citations {
          citationNumber
          title
          url
          rootRecordId
          rootRecordType
        }
      }
    }
  }
`;

function formatFootnotes(response: string) {
  // Remove all footnotes. TODO: Add footnotes
  const cleanResponse = response
    .trim()
    .replaceAll(/\[[\^\d]*\]/gi, '')
    .replaceAll('[^', '');

  return `${cleanResponse}`;
}

export function ChatResponse({
  message,
  sessionId,
  setSessionId,
  citations,
  setCitations,
}: {
  message: string;
  sessionId: string | undefined;
  setSessionId: (sessionId: string) => void;
  citations: object[];
  setCitations: (citations: object[]) => void;
}) {
  const graphQLQuery = sessionId
    ? {
        subscription: CONTINUE_SESSION_CHAT_RESULT,
        variables: { messageInput: message, sessionId },
      }
    : {
        subscription: NEW_SESSION_CHAT_RESULT,
        variables: { messageInput: message, organizationId: 'mintlify' },
      };

  const { data, loading } = useSubscription(graphQLQuery.subscription, {
    variables: graphQLQuery.variables,
    shouldResubscribe: false,
  });

  if (data == null || loading) {
    return (
      <div className="px-5 flex items-start space-x-5 w-full">
        <div className="mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-4 fill-primary dark:group-hover:fill-white dark:fill-primary"
          >
            <path d="M327.5 85.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 128l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 128l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 64 426.8 7.5C425.1 3 420.8 0 416 0s-9.1 3-10.8 7.5L384 64 327.5 85.2zM9.3 240C3.6 242.6 0 248.3 0 254.6s3.6 11.9 9.3 14.5L26.3 277l8.1 3.7 .6 .3 88.3 40.8L164.1 410l.3 .6 3.7 8.1 7.9 17.1c2.6 5.7 8.3 9.3 14.5 9.3s11.9-3.6 14.5-9.3l7.9-17.1 3.7-8.1 .3-.6 40.8-88.3L346 281l.6-.3 8.1-3.7 17.1-7.9c5.7-2.6 9.3-8.3 9.3-14.5s-3.6-11.9-9.3-14.5l-17.1-7.9-8.1-3.7-.6-.3-88.3-40.8L217 99.1l-.3-.6L213 90.3l-7.9-17.1c-2.6-5.7-8.3-9.3-14.5-9.3s-11.9 3.6-14.5 9.3l-7.9 17.1-3.7 8.1-.3 .6-40.8 88.3L35.1 228.1l-.6 .3-8.1 3.7L9.3 240zm83 14.5l51.2-23.6c10.4-4.8 18.7-13.1 23.5-23.5l23.6-51.2 23.6 51.2c4.8 10.4 13.1 18.7 23.5 23.5l51.2 23.6-51.2 23.6c-10.4 4.8-18.7 13.1-23.5 23.5l-23.6 51.2-23.6-51.2c-4.8-10.4-13.1-18.7-23.5-23.5L92.3 254.6zM384 384l-56.5 21.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 448l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 448l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 384l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L384 384z" />
          </svg>
        </div>
        <div className="h-6">
          <div className="mt-1 h-4 w-2 bg-gray-200 dark:bg-gray-600 animate-pulse"></div>
        </div>
      </div>
    );
  }

  const result = data.continueChatResult || data.newSessionChatResult;

  if (result.sessionId) {
    setSessionId(result.sessionId);
  }

  const usedCitations: Record<string, boolean> = {};

  const uniqueCitations = result.message.citations.filter((citation: any) => {
    if (usedCitations[citation.title]) {
      return false;
    }

    usedCitations[citation.title] = true;
    return true;
  });

  // Important to only set when citations is empty. TODO: Fix infinite loop
  if (citations.length === 0 && result.isEnd && uniqueCitations.length) {
    setCitations(uniqueCitations);
  }

  return (
    <>
      <div className="px-5 flex items-start space-x-5 w-full">
        <div className="mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-4 fill-primary dark:group-hover:fill-white dark:fill-primary"
          >
            <path d="M327.5 85.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 128l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 128l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 64 426.8 7.5C425.1 3 420.8 0 416 0s-9.1 3-10.8 7.5L384 64 327.5 85.2zM9.3 240C3.6 242.6 0 248.3 0 254.6s3.6 11.9 9.3 14.5L26.3 277l8.1 3.7 .6 .3 88.3 40.8L164.1 410l.3 .6 3.7 8.1 7.9 17.1c2.6 5.7 8.3 9.3 14.5 9.3s11.9-3.6 14.5-9.3l7.9-17.1 3.7-8.1 .3-.6 40.8-88.3L346 281l.6-.3 8.1-3.7 17.1-7.9c5.7-2.6 9.3-8.3 9.3-14.5s-3.6-11.9-9.3-14.5l-17.1-7.9-8.1-3.7-.6-.3-88.3-40.8L217 99.1l-.3-.6L213 90.3l-7.9-17.1c-2.6-5.7-8.3-9.3-14.5-9.3s-11.9 3.6-14.5 9.3l-7.9 17.1-3.7 8.1-.3 .6-40.8 88.3L35.1 228.1l-.6 .3-8.1 3.7L9.3 240zm83 14.5l51.2-23.6c10.4-4.8 18.7-13.1 23.5-23.5l23.6-51.2 23.6 51.2c4.8 10.4 13.1 18.7 23.5 23.5l51.2 23.6-51.2 23.6c-10.4 4.8-18.7 13.1-23.5 23.5l-23.6 51.2-23.6-51.2c-4.8-10.4-13.1-18.7-23.5-23.5L92.3 254.6zM384 384l-56.5 21.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 448l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 448l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 384l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L384 384z" />
          </svg>
        </div>
        <div className="prose prose-sm dark:prose-dark">
          <ReactMarkdown>{formatFootnotes(result.message.content)}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}
