import React from 'react';
import { useParams } from 'react-router-dom';

const withParams = (Component: typeof React.Component) => {
  return (props: any) => <Component {...props} params={useParams()} />;
}

const updateUrl = (newUrl: string) => {
  window.history.replaceState({}, '', newUrl);
}

const formatDate = (dateString: string) => {
  const date = new Date(Date.parse(dateString));
  const offset = date.getTimezoneOffset();

  const tzDate = new Date(date.getTime() - offset);
  return `${tzDate.getMonth() + 1}/${tzDate.getDate()}/${tzDate.getFullYear()}`;
}

export { formatDate, updateUrl, withParams };