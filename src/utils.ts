export const sortAlphabetical = (vals: string[]) => {
  return vals.sort((a, b) => {
    a.replace(/^The /, '');
    b.replace(/^The /, '');
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