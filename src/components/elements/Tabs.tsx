import React, { useEffect, useState } from 'react';

import Tab from './Tab';

interface OverrideProps {
  activeTab?: string;
  children: React.ReactElement[] | undefined;
  onClick?: (tabName: string) => void;
}

type TabsProps = HTMLElementProps<OverrideProps>;

const Tabs = (props: TabsProps) => {
  const [activeTab, setActiveTab] = useState(props.activeTab ?? props.children?.[0].props['data-tab']);
  const className = props.className ?? '';

  useEffect(() => {
    if (props.activeTab) {
      setActiveTab(props.activeTab);
    }
  }, [props.activeTab]);

  const onClickTabItem = (tabName: string) => {
    setActiveTab(tabName);
    if (props.onClick) {
      props.onClick(tabName);
    }
  };

  return (
    <>
      <div className={`flex flex-wrap justify-between p-0 border-b-2 border-b-light ${className}`}>
        {props.children && props.children.map((child) => {
          const label = child.props['data-tab'];

          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onTabClick={onClickTabItem}
            />
          );
        })}
      </div>
      {props.children && props.children.map((child) => {
        if (child.props['data-tab'] != activeTab) {
          return undefined;
        }
        return child.props.children;
      })}
    </>
  );
};

export default Tabs;
