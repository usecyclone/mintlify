import clsx from 'clsx';

type HighlightedResult = { value: string; matchLevel: 'none' | 'full' };

export type Hit = {
  objectID: string;
  title: string;
  heading?: string;
  subheading?: string;
  content: string;
  slug: string;
  _highlightResult: {
    title: HighlightedResult;
    heading?: HighlightedResult;
    subheading?: HighlightedResult;
    content?: HighlightedResult;
  };
  _snippetResult: {
    heading: HighlightedResult;
    content: HighlightedResult;
  };
};

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      className="h-3 w-3 ml-3 flex-none fill-current"
    >
      <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
    </svg>
  );
}

export function SearchHit({ active, hit }: { active: boolean; hit: Hit; breadcrumbs: string[] }) {
  if (hit._highlightResult.heading?.matchLevel === 'full') {
    return (
      <>
        <div
          className={clsx(
            'rounded-md ring-1 ring-gray-900/5 shadow-sm group-hover:shadow group-hover:ring-gray-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none',
            active ? 'bg-white dark:bg-primary' : 'dark:bg-gray-800'
          )}
        >
          <svg
            className="h-6 w-6 p-1.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              className={clsx(
                'stroke-primary-dark group-hover:stroke-primary-dark dark:group-hover:stroke-white',
                active ? 'stroke-primary-dark dark:stroke-white' : 'dark:stroke-gray-300'
              )}
              d="M3.75 1v10M8.25 1v10M1 3.75h10M1 8.25h10"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
          </svg>
        </div>
        <HitLocation
          active={active}
          hitHtml={hit._highlightResult.heading?.value}
          bubbleHtml={hit._highlightResult.title?.value}
        />
        {active && <ChevronRightIcon />}
      </>
    );
  }

  if (hit._highlightResult.subheading?.matchLevel === 'full') {
    return (
      <>
        <div
          className={clsx(
            'rounded-md ring-1 ring-gray-900/5 shadow-sm group-hover:shadow group-hover:ring-gray-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none',
            active ? 'bg-white dark:bg-primary' : 'dark:bg-gray-800'
          )}
        >
          <svg
            className="h-6 w-6 p-1.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              className={clsx(
                'stroke-primary-dark group-hover:stroke-primary-dark dark:group-hover:stroke-white',
                active ? 'stroke-primary-dark dark:stroke-white' : 'dark:stroke-gray-300'
              )}
              d="M3.75 1v10M8.25 1v10M1 3.75h10M1 8.25h10"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
          </svg>
        </div>
        <HitLocation
          active={active}
          hitHtml={hit._highlightResult.subheading?.value}
          bubbleHtml={hit._highlightResult.title?.value}
        />
        {active && <ChevronRightIcon />}
      </>
    );
  }

  return (
    <>
      <div
        className={clsx(
          'rounded-md ring-1 ring-gray-900/5 shadow-sm group-hover:shadow group-hover:ring-gray-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none',
          active ? 'bg-white dark:bg-primary' : 'dark:bg-gray-800'
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          className={clsx(
            'h-6 w-6 p-1 fill-primary-dark dark:group-hover:fill-white',
            active ? 'fill-primary-dark dark:fill-white' : 'dark:fill-gray-300'
          )}
        >
          <path d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z" />
        </svg>
      </div>
      <HitLocation
        active={active}
        hitHtml={hit._snippetResult.content?.value}
        bubbleHtml={hit._highlightResult.title?.value}
      />
      {active && <ChevronRightIcon />}
    </>
  );
}

function HitLocation({
  active,
  hitHtml,
  bubbleHtml,
}: {
  active: boolean;
  hitHtml: string;
  bubbleHtml?: string;
}) {
  // Show bubble beside hit
  return (
    <div className="ml-4 flex-auto w-full space-y-0.5">
      {bubbleHtml && (
        <div className="mr-2">
          <p
            className={clsx(
              'truncate',
              active
                ? 'text-white'
                : 'border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-300'
            )}
            dangerouslySetInnerHTML={{ __html: bubbleHtml }}
          ></p>
        </div>
      )}
      <p
        className={clsx(active ? 'text-white' : 'text-gray-500 dark:text-gray-500')}
        dangerouslySetInnerHTML={{ __html: hitHtml }}
      ></p>
    </div>
  );
}
