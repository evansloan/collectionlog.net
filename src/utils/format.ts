const formatDate = (dateString: string): string => {
  const date = new Date(Date.parse(dateString));
  const offset = date.getTimezoneOffset();

  const tzDate = new Date(date.getTime() - offset);
  return `${tzDate.getMonth() + 1}/${tzDate.getDate()}/${tzDate.getFullYear()}`;
}

const capitalize = (s: string): string => {
  s = s.toLowerCase();
  return s[0].toUpperCase() + s.slice(1);
}

export {
  capitalize,
  formatDate,
};