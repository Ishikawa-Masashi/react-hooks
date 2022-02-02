import React from 'react';

export function useAnimationFrame(callback: () => void) {
  const requestRef = React.useRef<ReturnType<typeof requestAnimationFrame>>();

  // callback関数に変更があった場合のみanimateを再生成する
  const animate = React.useCallback(() => {
    callback();
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);

  // callback関数に変更があった場合は一度破棄して再度呼び出す
  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        return cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);
}
