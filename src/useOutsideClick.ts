import * as React from 'react';

export const useOutsideClick = (ref: React.RefObject<HTMLElement>) => {
  const [outsieClick, setOutsideClick] = React.useState(false);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOutsideClick(true);
        return;
      }
      setOutsideClick(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return outsieClick;
};
