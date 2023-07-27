import React, { useEffect } from 'react';

export const useOutsideClickHandler = (ref: React.RefObject<Element>, clickHandler: (...args: any) => void) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Element;
      if (ref.current && !ref.current.contains(target)) {
        clickHandler();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [ref]);
};
