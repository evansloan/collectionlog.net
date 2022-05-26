import React from 'react';

interface ContainerProps {
  bgColor?: string;
  children: React.ReactNode;
}

const Container = (props: ContainerProps) => (
  <div className={`flex flex-col m-auto w-full lg:w-3/4 ${props.bgColor}`}>
    {props.children}
  </div>
);

export default Container;
