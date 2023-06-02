import clsx from 'clsx';
import Link from 'next/link';
import { useCallback, useContext, useState } from 'react';

import { ConfigContext } from '@/context/ConfigContext';
import { Event } from '@/enums/events';
import { useAnalyticsContext } from '@/hooks/useAnalyticsContext';

import Icon from '../../Icon';
import { ChatResponse } from './ChatResponse';

export function Chat({
  message,
  onBack,
  onClose,
}: {
  message: string;
  onBack: () => void;
  onClose: () => void;
}) {
  const { mintConfig } = useContext(ConfigContext);
  const [sessionId, setSessionId] = useState<string>();
  const [followupMessage, setFollowupMessage] = useState('');
  const [messages, setMessages] = useState<{ message: string }[]>([{ message }]);
  const [citations, setCitations] = useState<object[]>([]);
  const trackChatFollowup = useAnalyticsContext(Event.ChatFollowup);

  const onSendFollowupMessage = useCallback(() => {
    setMessages([...messages, { message: followupMessage }]);

    trackChatFollowup({
      query: followupMessage,
    });

    setFollowupMessage('');
  }, [messages, followupMessage, trackChatFollowup]);

  const onEnter = useCallback(
    (event: any) => {
      if (event.key === 'Enter') {
        onSendFollowupMessage();
      }
    },
    [onSendFollowupMessage]
  );

  return (
    <div className="divide-y divide-gray-500 divide-opacity-10">
      <div className="h-14 flex items-center">
        <button
          className="group absolute left-[0.5rem] p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          onClick={onBack}
        >
          <Icon
            icon="chevron-left"
            iconType="regular"
            className="h-3.5 w-3.5 bg-gray-600 dark:bg-gray-400 group-hover:bg-gray-800 dark:group-hover:bg-gray-200"
          />
        </button>
        <div className="border-0 bg-transparent ml-[3.5rem] pr-6 text-sm text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark flex items-center">
          Ask {mintConfig?.name}
        </div>
      </div>
      <div className="py-5">
        <div className="space-y-8">
          {messages.map(({ message }) => (
            <div key={message} className="space-y-6 pl-2 pr-4 max-w-2xl">
              <div className="px-5 flex items-center text-sm space-x-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="h-4 fill-gray-400 dark:fill-gray-600"
                >
                  <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                </svg>
                <div className="text-gray-700 dark:text-gray-300 font-semibold">{message}</div>
              </div>
              <ChatResponse
                message={message}
                sessionId={sessionId}
                setSessionId={setSessionId}
                citations={citations}
                setCitations={setCitations}
              />
            </div>
          ))}
        </div>
        {citations.length > 0 && (
          <div className="mt-5 px-7 text-sm text-gray-400 dark:text-gray-500">
            Sources
            <div className="mt-2 flex items-center text-xs flex-wrap">
              {citations.map((citation: any) => {
                return (
                  <Link key={citation.url} href={citation.url} onClick={() => onClose()}>
                    <div className="mt-1.5 mr-1.5 px-2 py-0.5 border border-primary/40 bg-primary/5 rounded-md text-primary-dark dark:text-primary hover:border-primary">
                      {citation.title}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
        <div className="mt-8 relative mx-5 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center">
          <button
            className="absolute right-3.5"
            disabled={!followupMessage}
            onClick={onSendFollowupMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className={clsx(
                'h-3.5 -rotate-45',
                followupMessage
                  ? 'fill-gray-700 dark:fill-gray-300'
                  : 'fill-gray-300 dark:fill-gray-700'
              )}
            >
              <path d="M49.9 27.8C15.1 12.7-19.2 50.1-1.2 83.5L68.1 212.2c4.4 8.3 12.6 13.8 21.9 15c0 0 0 0 0 0l176 22c3.4 .4 6 3.3 6 6.7s-2.6 6.3-6 6.7l-176 22s0 0 0 0c-9.3 1.2-17.5 6.8-21.9 15L-1.2 428.5c-18 33.4 16.3 70.8 51.1 55.7L491.8 292.7c32.1-13.9 32.1-59.5 0-73.4L49.9 27.8z" />
            </svg>
          </button>
          <input
            className="w-full px-4 py-2.5 rounded-md bg-transparent text-sm focus:outline-primary-dark"
            placeholder="Ask a followup question..."
            value={followupMessage}
            onChange={(e) => {
              setFollowupMessage(e.target.value);
            }}
            onKeyDown={onEnter}
          />
        </div>
      </div>
    </div>
  );
}
