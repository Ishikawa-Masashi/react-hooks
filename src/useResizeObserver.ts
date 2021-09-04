import { RefObject, useLayoutEffect, useState } from 'react';

export function useResizeObserver(ref: RefObject<HTMLElement>): number[] {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (width !== entries[0].contentRect.width) {
        setWidth(entries[0].contentRect.width);
      }

      if (height !== entries[0].contentRect.height) {
        setHeight(entries[0].contentRect.height);
      }
    });

    if (ref.current !== null) {
      resizeObserver.observe(ref.current);
    }

    return () => void resizeObserver.disconnect();
  }, [ref]);

  return [width, height];
}
