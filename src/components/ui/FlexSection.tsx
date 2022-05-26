import React from 'react';

import { withDefaults } from '@utils/components';

interface FlexSectionProps {
  id?: string;
  direction?: string;
  justify?: string;
  align?: string;
  height?: string;
  width?: string;
  margin?: string;
  padding?: string;
  borderStyle?: string;
  children?: React.ReactNode;
}

const defaultProps: FlexSectionProps = {
  id: '',
  direction: '',
  justify: '',
  align: '',
  height: '',
  width: '',
  margin: '',
  padding: '',
  borderStyle: 'border-4 border-black',
}

const FlexSection = (props: FlexSectionProps) => {
  return (
    <div
      id={props.id}
      className={`flex ${props.direction} ${props.justify} ${props.align} ${props.height} ${props.width} ${props.margin} ${props.padding} ${props.borderStyle} shadow-log`}
    >
      {props.children}
    </div>
  );
};

export default withDefaults(FlexSection, defaultProps);
