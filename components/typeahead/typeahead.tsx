'use client';

import React, {
  ChangeEvent,
  FormEvent,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import Spinner from '@/components/spinner';
import { Input, InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const SEARCH_DEBOUNCE = 250;
const MAX_RESULTS = 5;

interface TypeaheadCache<T> {
  results: T[];
  searchQuery: string;
  searchLength: number;
}

interface GenericTypeaheadProps<T> {
  fetchResults: (typeaheadValue: string) => Promise<T[]>;
  renderResults: (result: T, iter: number) => ReactNode;
  filterResults: (result: T, typeaheadValue: string) => boolean;
  onTypeaheadSubmit: (results: T[]) => void;
  onValueChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputProps?: InputProps;
  containerProps?: HTMLAttributes<HTMLDivElement>;
  debounceTime?: number;
  maxResults?: number;
}

const Typeahead = <T,>({
  fetchResults,
  renderResults,
  filterResults,
  onTypeaheadSubmit,
  onValueChange,
  debounceTime,
  inputProps,
  containerProps,
  maxResults,
}: GenericTypeaheadProps<T>) => {
  const [typeaheadValue, setTypeaheadValue] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [typeaheadCache, setTypeaheadCache] = useState<TypeaheadCache<T>>({
    results: [],
    searchQuery: '',
    searchLength: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const filterTypeahead = useCallback(() => {
    const matchedResults: T[] = [];
    const max = maxResults ?? MAX_RESULTS;

    for (const result of typeaheadCache.results) {
      if (matchedResults.length >= max) {
        break;
      }

      if (filterResults(result, typeaheadValue)) {
        matchedResults.push(result);
      }
    }

    setResults(matchedResults);
  }, [filterResults, typeaheadCache.results, typeaheadValue]);

  const typeaheadSearch = async () => {
    if (!typeaheadValue.trim().length) {
      return setResults([]);
    }

    if (
      typeaheadValue[0] !== typeaheadCache.searchQuery[0] ||
      typeaheadValue.length < typeaheadCache.searchLength
    ) {
      setIsLoading(true);
      const typeaheadResults = await fetchResults(typeaheadValue);
      setIsLoading(false);
      return setTypeaheadCache({
        results: typeaheadResults,
        searchQuery: typeaheadValue,
        searchLength: typeaheadValue.length,
      });
    }

    filterTypeahead();
  };

  const onTypeaheadValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTypeaheadValue(e.currentTarget.value);

    if (onValueChange) {
      onValueChange(e);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!results.length) {
      return;
    }

    onTypeaheadSubmit(results);
  };

  useEffect(() => {
    const debounce = setTimeout(
      async () => typeaheadSearch(),
      debounceTime ?? SEARCH_DEBOUNCE
    );

    return () => clearTimeout(debounce);
  }, [typeaheadValue]);

  useEffect(() => filterTypeahead(), [typeaheadCache]);

  return (
    <>
      <form className='flex w-full justify-center' onSubmit={onSubmit}>
        <Input {...inputProps} onChange={onTypeaheadValueChange} />
      </form>
      {results.length > 0 ? (
        <div
          {...containerProps}
          className={cn(
            'w-full border-2 border-black bg-background sm:w-2/3 md:w-1/2 lg:w-1/3',
            containerProps?.className
          )}
        >
          {results.map((result, i) => renderResults(result, i))}
        </div>
      ) : (
        isLoading && (
          <div className='flex h-[200px] justify-center'>
            <Spinner />
          </div>
        )
      )}
    </>
  );
};

export default Typeahead;
