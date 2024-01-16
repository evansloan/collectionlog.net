import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { getLocale } from '@/lib/utils';

interface QueryParams {
  [k: string]: string | undefined | null;
}

export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (updateParams: QueryParams) => {
      const queryParams = new URLSearchParams(searchParams.toString());
      Object.entries(updateParams).forEach(([key, value]) => {
        if (!value) {
          return queryParams.delete(key);
        }
        queryParams.set(key, value);
      });
      router.push(`${pathname}?${queryParams.toString()}`);
    },
    [pathname, router, searchParams]
  );
};

export const useLocale = () => {
  const [locale, setLocale] = useState('en');
  useEffect(() => setLocale(getLocale()), []);

  return locale;
};

interface ViewSection<T> {
  name: string;
  data: T;
}

/**
 * Represents the currently opened collection log tab/page combination
 *
 * @interface
 */
export interface OpenView {
  tab: ViewSection<CollectionLogPage>;
  page: ViewSection<{
    items: CollectionLogItem[];
    killCount: CollectionLogKillCount[] | undefined;
  }>;
}

export const useCollectionLogView = (
  collectionLog: CollectionLog,
  pageName?: string
) => {
  const defaultTabName = 'Bosses';
  const defaultPageName = 'Abyssal Sire';

  const { tabs } = collectionLog;

  /**
   * Retrieves the open view based on the provided page name and collection log tabs.
   * If the page name is not provided, the default open view will be returned.
   *
   * @param {string | undefined} pageName - The name of the page to retrieve the view from.
   * @param {CollectionLogTab} tabs - All available collection log tabs.
   * @return {OpenView} - The open view object.
   */
  const getOpenViewFromPageName = (pageName?: string): OpenView => {
    const defaultTab = tabs[defaultTabName];
    const defaultPage = defaultTab[defaultPageName];

    const defaultOpen = {
      tab: {
        name: defaultTabName,
        data: defaultTab,
      },
      page: {
        name: defaultPageName,
        data: defaultPage,
      },
    };

    if (!pageName) {
      return defaultOpen;
    }

    for (const tabName in tabs) {
      const pages = tabs[tabName];
      const foundName = Object.keys(pages).find(
        (p) => p.toLowerCase() === pageName?.toLowerCase()
      );

      if (foundName) {
        const tab = tabs[tabName];
        const page = tab[foundName];

        return {
          tab: {
            name: tabName,
            data: tab,
          },
          page: {
            name: foundName,
            data: page,
          },
        };
      }
    }

    return defaultOpen;
  };

  const [openView, setOpenView] = useState(getOpenViewFromPageName(pageName));

  const updateViewByTab = (tabName: string) => {
    const tab = tabs[tabName];
    const pageName = Object.keys(tab)[0];
    const page = tab[pageName];

    setOpenView({
      page: {
        name: pageName,
        data: page,
      },
      tab: {
        name: tabName,
        data: tab,
      },
    });
  };

  const updateViewByPage = (pageName: string) => {
    setOpenView(getOpenViewFromPageName(pageName));
  };

  return {
    openView,
    updateViewByTab,
    updateViewByPage,
  };
};
