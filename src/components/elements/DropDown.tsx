import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { useOutsideClickHandler } from '../../app/hooks/ui';
interface DropDownProps {
  title: string;
  closeOnClick?: boolean;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpened?: () => void;
  onClosed?: () => void;
}

const DropDown = (props: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(props.isOpen ?? false);

  const wrapperRef = useRef(null);
  useOutsideClickHandler(wrapperRef, () => setIsOpen(false));

  const {
    title,
    closeOnClick,
    children,
    onOpened,
    onClosed,
  } = props;

  const onClick = closeOnClick ? () => setIsOpen(false) : () => undefined;

  useEffect(() => {
    if (isOpen && onOpened) {
      onOpened();
    }

    if (!isOpen && onClosed) {
      onClosed();
    }
  }, [isOpen]);

  useEffect(() => {
    if (props.isOpen != undefined) {
      setIsOpen(props.isOpen);
    }
  }, [props.isOpen]);

  return (
    <div id='header-dropdown' ref={wrapperRef}>
      <div className='md:relative'>
        <button className='text-orange text-shadow cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
          <span className='underline'>{title}</span> <span><FontAwesomeIcon icon={faChevronDown} className='h-[15px] icon-shadow'/></span>
        </button>
        {isOpen &&
          <div className='flex flex-col absolute left-0 right-0 md:left-auto md:right-auto md:min-w-[150px] p-2 text-left bg-dark border border-black z-50' onClick={onClick}>
            {children}
          </div>
        }
      </div>
    </div>
  );
};

export default DropDown;
