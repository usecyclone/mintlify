import clsx from 'clsx';
import { ReactNode, useEffect, useState } from 'react';
import { Rect, useRect } from 'react-use-rect';

import { MDXContentActionEnum } from '@/enums/MDXContentActionEnum';
import { useMDXContent } from '@/hooks/useMDXContent';
import { useTop } from '@/hooks/useTop';

type HeadingProps = {
  level: number;
  id: string;
  children: ReactNode;
  className?: string;
  hidden?: boolean;
  ignore?: boolean;
  style?: object;
};

export function Heading({
  level,
  id,
  children,
  className = '',
  hidden = false,
  style = {},
  ...props
}: HeadingProps) {
  const Component = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const [context, dispatch] = useMDXContent();
  const [rect, setRect] = useState<Rect | null>(null);
  const [rectRef] = useRect(setRect);
  const top = useTop(rect);

  // We cannot include context in the dependency array because it changes every render.
  const hasContext = Boolean(context);
  useEffect(() => {
    if (!hasContext) return;
    if (typeof top !== 'undefined') {
      dispatch({
        type: MDXContentActionEnum.REGISTER_HEADING,
        payload: { id, top },
      });
    }
    return () => {
      dispatch({
        type: MDXContentActionEnum.UNREGISTER_HEADING,
        payload: id,
      });
    };
  }, [top, id, hasContext, dispatch]);
  return (
    <Component
      className={clsx('flex whitespace-pre-wrap group', className, {
        'text-2xl sm:text-3xl': Component === 'h1',
      })}
      id={id}
      ref={rectRef}
      style={{ ...(hidden ? { marginBottom: 0 } : {}), ...style }}
      {...props}
    >
      {!hidden && (
        <a
          href={`#${id}`}
          className="absolute -ml-10 flex items-center opacity-0 border-0 group-hover:opacity-100"
          aria-label="Navigate to header"
        >
          &#8203;
          <div className="w-6 h-6 text-gray-400 rounded-md flex items-center justify-center zinc-box bg-white ring-1 ring-gray-400/30 dark:ring-gray-700/25 hover:ring-gray-400/60 dark:hover:ring-white/20">
            <svg
              className="h-4 w-4"
              fill="currentColor"
              height="512"
              viewBox="0 0 24 24"
              width="512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="m9 4c.55228 0 1 .44772 1 1v3h4v-3c0-.55228.4477-1 1-1s1 .44772 1 1v3h3c.5523 0 1 .44772 1 1s-.4477 1-1 1h-3v4h3c.5523 0 1 .4477 1 1s-.4477 1-1 1h-3v3c0 .5523-.4477 1-1 1s-1-.4477-1-1v-3h-4v3c0 .5523-.44772 1-1 1s-1-.4477-1-1v-3h-3c-.55228 0-1-.4477-1-1s.44772-1 1-1h3v-4h-3c-.55228 0-1-.44772-1-1s.44772-1 1-1h3v-3c0-.55228.44772-1 1-1zm5 10v-4h-4v4z"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </a>
      )}
      <span className={hidden ? 'sr-only' : undefined}>{children}</span>
    </Component>
  );
}
