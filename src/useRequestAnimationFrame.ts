import { useRef, useEffect } from 'react';
import { noop } from './utils/noop';

/**
 *
 * useRequestAnimationFrame
 * A continuously running requestAnimationFrame hook for React
 *
 * @param {Function} callback The callback function to be executed
 * @param {boolean} [isActive] The value which while true, keeps the raf running infinitely
 * @see https://rooks.vercel.app/docs/useRaf
 */
export function useRequestAnimationFrame(
  callback: (timeElapsed: number) => void,
  isActive: boolean
): void {
  const savedCallback = useRef<(timeElapsed: number) => void>();
  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let animationFrame: number | undefined;
    let startTime: number = Date.now();

    function tick() {
      const timeElapsed = Date.now() - startTime;
      startTime = Date.now();
      loop();
      savedCallback.current?.(timeElapsed);
    }

    function loop() {
      animationFrame = window.requestAnimationFrame(tick);
    }

    if (isActive) {
      startTime = Date.now();
      loop();

      return () => {
        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
        }
      };
    } else {
      return noop;
    }
  }, [isActive]);
}
