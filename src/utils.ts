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

export const formatDate = (dateString: string): string => {
  const date = new Date(Date.parse(dateString));
  const offset = date.getTimezoneOffset();

  const tzDate = new Date(date.getTime() - offset);
  return `${tzDate.getMonth() + 1}/${tzDate.getDate()}/${tzDate.getFullYear()}`;
};

export const toTitleCase = (value: string) => {
  return value.replace(
    /\w\S*/g,
    (txt) => {
      return `${txt.charAt(0).toUpperCase()}${txt.substring(1).toLowerCase()}`;
    }
  );
};
