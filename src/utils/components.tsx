import React from 'react';
import { useParams } from 'react-router-dom';

const withParams = (Component: typeof React.Component) => {
  return (props: any) => <Component {...props} params={useParams()} />;
}

const withDefaults = <P,>(Component: typeof React.Component | React.FunctionComponent<P>, defaultProps: any) => {
  return (props: P) => {
    const propsWithDefaults = {
      ...defaultProps,
      ...props
    };
    return <Component {...propsWithDefaults} />;
  }
};

const updateUrl = (newUrl: string): void => {
  window.history.replaceState({}, '', newUrl);
}

export {
  updateUrl,
  withDefaults,
  withParams
};