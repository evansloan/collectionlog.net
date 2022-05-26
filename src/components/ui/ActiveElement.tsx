import React, { DOMElement } from 'react';

import { withDefaults } from '@utils/components';

interface ActiveElementProps {
  activeClass: string;
  children?: React.ReactNode;
  className?: string;
  clickHandler?: ((...args: any) => void);
  isActive?: boolean;
  name: string;
  tagName: string;
};

const defaultProps = {
  className: '',
  isActive: false,
};

const ActiveElement = (props: ActiveElementProps) => {
  const ActiveTagName = props.tagName as keyof JSX.IntrinsicElements;

  const setActive = (e: React.MouseEvent) => {
    const elements = document.getElementsByName(props.name);
    elements.forEach((element) => {
      element.classList.remove(props.activeClass);
    });
    e.currentTarget.classList.add(props.activeClass);

    if (props.clickHandler != undefined) {
      props.clickHandler();
    }
  };

  let className = props.className;
  if (props.isActive) {
    className = `${className} ${props.activeClass}`;
  }

  return (
    <ActiveTagName key={props.name} name={props.name} className={className} onClick={(e) => setActive(e)}>
      {props.children}
    </ActiveTagName>
  );
};

export default withDefaults(ActiveElement, defaultProps);
