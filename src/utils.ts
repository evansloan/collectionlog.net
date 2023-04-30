export const sortAlphabetical = (vals: string[]) => {
  return vals.sort((a, b) => {
    a = a.replace(/^The /, '');
    b = b.replace(/^The /, '');
    return a.localeCompare(b);
  });
};

export const updateUrl = (newUrl: string): void => {
  window.history.replaceState({}, '', newUrl);
};

const getLanguage = () => {
  if (navigator.languages != undefined) {
    return navigator.languages[0];
  }
  return navigator.language;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(Date.parse(dateString));
  const offset = date.getTimezoneOffset();

  const tzDate = new Date(date.getTime() - offset);
  return tzDate.toLocaleString(getLanguage(), {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
};

export const toTitleCase = (value: string) => {
  return value.replace(
    /\w\S*/g,
    (txt) => {
      return `${txt.charAt(0).toUpperCase()}${txt.substring(1).toLowerCase()}`;
    }
  );
};
