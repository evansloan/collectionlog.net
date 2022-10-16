import React from 'react';

interface OverrideProps {
  rowLayout?: boolean;
}

type ContainerProps = HTMLElementProps<OverrideProps>;

const PageContainer = (props: ContainerProps) => {
  let flexDirection = 'flex-col';
  if (props.rowLayout) {
    flexDirection = 'flex-row';
  }

  return (
    <div className={`flex ${flexDirection} grow w-full md:w-3/4 m-auto border-4 border-black bg-primary shadow-log md:overflow-hidden`}>
      {props.children}
    </div>
  );
};

export default PageContainer;
