import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple classes or class arrays into a single string.
 *
 * @param {...ClassValue[]} inputs - The classes or class arrays to be combined.
 * @return {string} - The combined classes as a single string.
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

/**
 * Get the locale of the user's browser.
 *
 * @function
 * @returns {string} The locale of the user's browser.
 */
export const getLocale = (): string => {
  if (navigator.languages != undefined) {
    return navigator.languages[0];
  }
  return navigator.language;
};

/**
 * Formats a date string in the specified locale.
 *
 * @param {string} dateString - The date string to format.
 * @param {string} locale - The locale to use for formatting.
 * @returns {string} The formatted date string in the specified locale.
 */
export const formatDate = (dateString: string, locale: string): string => {
  const date = new Date(Date.parse(dateString));
  const offset = date.getTimezoneOffset();
  const tzDate = new Date(date.getTime() - offset);

  return tzDate.toLocaleString(locale, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
};

/**
 * Converts a number to a string with formatting based on the user's locale.
 *
 * @param {number} n - The number to format.
 * @returns {string} The formatted string representation of the number.
 */
export const formatInt = (n: number): string =>
  new Intl.NumberFormat().format(n);

/**
 * Converts a given string to title case.
 *
 * @param {string} str - The string to be converted to title case.
 * @returns {string} - The string in title case.
 */
export const toTitleCase = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
  });
};

/**
 * Replaces the current URL in the browser's history with the specified URL.
 *
 * @param {string} url - The new URL to replace the current one.
 * @returns {void}
 */
export const replaceUrl = (url: string): void => {
  window.history.replaceState(
    { ...window.history.state, as: url, url },
    '',
    url
  );
};

/**
 * Sorts an array of strings alphabetically, ignoring the leading "The" keyword.
 *
 * @param {string[]} vals - The array of strings to be sorted.
 * @returns {string[]} - The sorted array of strings.
 */
export const sortAlphabetical = (vals: string[]): string[] => {
  return vals.sort((a, b) => {
    a = a.replace(/^The /, '');
    b = b.replace(/^The /, '');
    return a.localeCompare(b);
  });
};

export const sortKeys = <T>(unordered: { [k: string]: T }) => {
  return sortAlphabetical(Object.keys(unordered))
    .reduce((obj: { [k: string]: any }, key) => {
      obj[key] = unordered[key];
      return obj;
    }, {});
};

/**
 * Converts a string by replacing spaces with hyphens.
 *
 * @param {string} s - The string to be hyphenated.
 * @returns {string} The hyphenated string.
 */
export const hyphenate = (s: string): string => {
  return s.replace(/ /g, '-');
};
