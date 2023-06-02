import { useEffect, useRef, useState } from 'react';

const getDiff = (x: string, y: string) => {
  let from = 0;
  let to = 0;
  let result = '';
  while (to < y.length) {
    if (x[from] != y[to] || from == x.length) result += y[to];
    else from++;
    to++;
  }
  return { result, from, to };
};

const uniqueBy = <T,>(arr: T[], fn: (x: T, y: T) => boolean) =>
  arr.reduce((acc: T[], x) => {
    if (!acc.some((y: T) => fn(x, y))) acc.push(x);
    return acc;
  }, []);

export const useStaticContent = (printConsoleWarnings?: boolean, hydrateRerender?: boolean) => {
  const ref = useRef<HTMLElement>(null);
  const [render, setRender] = useState(typeof window === 'undefined');
  const [hydrated, setHydrated] = useState(false);
  const innerHtml = useRef<string[]>([]);
  const rerender = hydrated || hydrateRerender;

  useEffect(() => {
    // check if the innerHTML is empty to figure out if it is a client navigation.
    const isEmpty = ref.current?.innerHTML === '';
    if (isEmpty) {
      setRender(true);
    }
  }, []);

  useEffect(() => {
    setHydrated(true);
  }, []);
  const lastCount = useRef(0);
  // Needs to be improved to show better information.
  useEffect(() => {
    if (printConsoleWarnings) {
      const hasInnerHtml = ref.current != undefined && (ref.current?.innerHTML?.length ?? 0) > 0;
      if (
        hasInnerHtml &&
        (ref.current.children?.length > 1 || (ref.current.children[0]?.innerHTML?.length ?? 0) > 0)
      ) {
        innerHtml.current = [...innerHtml.current, ref.current?.innerHTML.trim()];
        const unique = uniqueBy(innerHtml.current, (x, y) => x == y);
        innerHtml.current = unique;
        if (unique.length > 1) {
          const d = unique.map((x, i) => {
            const y = unique[i - 1] && unique[i - 1];
            return {
              html: x,
              diff: unique[i - 1] && {
                expected: getDiff(x, y),
                actual: getDiff(y, x),
              },
            };
          });
          if (unique.length > lastCount.current) {
            lastCount.current = unique.length;
            console.warn(`⚠️Found hydration mismatch.`, d);
          }
        }
      }
    }
  });

  useEffect(() => {
    if (printConsoleWarnings) {
      if (!rerender || render) {
        console.warn('⚠️Avoiding hydration client rerender');
      }
    }
  }, [printConsoleWarnings, ref, render, rerender]);

  return { render: render || rerender, ref };
};
