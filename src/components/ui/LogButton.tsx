import React from 'react';

type ButtonType = 'button' | 'reset' | 'submit' | undefined;

interface LogButtonProps {
  children: React.ReactNode;
  className?: string;
  type: ButtonType;
};

const LogButton = (props: LogButtonProps) => {
  let className = 'p-[10px] bg-primary hover:bg-highlight text-orange text-[20px] text-shadow border-2 border-lighter';
  if (props.className) {
    className = `${className} ${props.className}`;
  }
  return (
    <button className={className} type={props.type}>
      {props.children}
    </button>
  );
};

export default LogButton;
