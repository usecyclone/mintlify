import { renderHook } from '@testing-library/react';
import * as nextRouter from 'next/router';
import { ReactNode } from 'react';

import { ConfigContext, ConfigContextType } from '@/context/ConfigContext';
import { usePrevNext } from '@/hooks/usePrevNext';

const asPath = '/current';
const prevPath = '/prev';
const nextPath = '/next';
const group = 'test';

const routerMock = {
  asPath,
};

const useRouter = jest.spyOn(nextRouter, 'useRouter').mockImplementation(() => routerMock as never);

const current = { href: asPath };
const prev = { href: prevPath };
const next = { href: nextPath };
const pages = [prev, current, next];
const wrapper = ({ children }: { children: ReactNode }) => (
  <ConfigContext.Provider
    value={
      {
        navWithMetadata: [
          {
            group,
            pages,
          },
        ],
        openApiFiles: [],
      } as ConfigContextType
    }
  >
    {children}
  </ConfigContext.Provider>
);

describe('usePrevNext hook unit tests', () => {
  it('should return previous and next page', () => {
    const expectedResult = {
      next,
      prev,
    };

    const { result } = renderHook(() => usePrevNext(), {
      wrapper,
    });

    expect(useRouter).toHaveBeenCalledTimes(1);
    expect(result.current).toStrictEqual(expectedResult);
  });

  it('should rerender after navigating to next page and update previous and next page', () => {
    const expectedInitialResult = {
      next,
      prev,
    };
    const expectedResult = {
      next: null,
      prev: current,
    };

    const { result, rerender } = renderHook(() => usePrevNext(), {
      wrapper,
    });
    const initialResult = result.current;
    routerMock.asPath = nextPath;
    rerender();

    expect(useRouter).toHaveBeenCalledTimes(3);
    expect(initialResult).toStrictEqual(expectedInitialResult);
    expect(result.current).toStrictEqual(expectedResult);
  });
});
