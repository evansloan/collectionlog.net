import React, { useEffect, useState } from 'react';
import DocumentMeta from 'react-document-meta';
import { useNavigate, useParams } from 'react-router-dom';

import { AccountType } from '../app/constants';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  FilterType,
  loadHiscores,
  searchHiscores,
  setAccountType,
  setPage,
} from '../app/reducers/hiscores/slice';
import {
  Button,
  Input,
  PageTitle,
  Spinner,
  Table,
} from '../components/elements';
import Select, { SelectOption } from '../components/elements/Select';
import { ColumnType } from '../components/elements/Table';
import { PageContainer, PageHeader } from '../components/layout';
import { toTitleCase, updateUrl } from '../utils';
import AnalyticsService from '../services/analytics';

const URL_PATH = 'hiscores';

const TABLE_COLUMNS = [
  {
    heading: 'Rank',
    key: 'rank',
    type: ColumnType.TEXT,
  },
  {
    heading: 'Username',
    key: 'username',
    type: ColumnType.LINK,
    linkHref: '/log',
  },
  {
    heading: 'Account Type',
    key: 'accountType',
    type: ColumnType.IMAGE,
  },
  {
    heading: 'Obtained',
    key: {
      keys: ['obtained', 'total'],
      delimiter: '/',
    },
    type: ColumnType.COMBO,
    color: 'text-yellow',
  },
];

const Hiscores = () => {
  const hiscoresState = useAppSelector((state) => state.hiscores);
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  const accountTypeOptions: SelectOption[] = [{ title: 'All', value: 'ALL', selected: true }];

  for (const accountType in AccountType) {
    const optionTitle = toTitleCase(accountType.replace(/_/g, ' '));
    accountTypeOptions.push({
      title: optionTitle,
      value: accountType,
    });
  }

  /**
   * Load hiscores data from API.
   *
   * Called on page load
   */
  useEffect(() => {
    let page = Number(params.page);
    if (!page) {
      page = 1;
      updateUrl(`/${URL_PATH}/${page}`);
    }

    if (page != hiscoresState.page) {
      dispatch(setPage(page));
    }

    AnalyticsService.hsPageChangeEvent(page);
  }, [params.page]);

  useEffect(() => {
    const { accountType: filter, page } = hiscoresState;

    updateUrl(`/${URL_PATH}/${page}`);
    dispatch(loadHiscores({ page, filter }));
  }, [hiscoresState.page]);

  const onPageClick = (page: number) => {
    navigate(`/${URL_PATH}/${page}`);
  };

  const onAccountTypeChange = (value: string) => {
    const newAccountType = value as FilterType;
    dispatch(setAccountType(newAccountType));
    dispatch(loadHiscores({
      page: hiscoresState.page,
      filter: newAccountType,
    }));
  };

  const onSearchChange = (value: string) => {
    setSearch(value);
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (search === '') {
      return;
    }

    dispatch(searchHiscores({
      username: search,
      filter: hiscoresState.accountType,
    }));

    AnalyticsService.hsUserSearchEvent(search.toLowerCase());
  };

  const showMenu = () => {
    const menu = document.getElementById('hiscores-menu');

    const isHidden = menu?.classList.contains('hidden');

    if (isHidden) {
      menu?.classList.remove('hidden');
      menu?.classList.add('flex');
    } else {
      menu?.classList.add('hidden');
      menu?.classList.remove('flex');
    }
  };

  const meta = {
    title: `Hiscores | Page ${hiscoresState?.page ?? 1}`,
  };

  const mobileButtonGroup = (
    <div className='flex md:hidden'>
      {hiscoresState.page > 1 &&
        <Button
          title={`< Page ${hiscoresState.page - 1}`}
          onClick={() => onPageClick(hiscoresState.page - 1)}
          className='flex-1 text-orange'
        />
      }
      <Button
        title={`Page ${hiscoresState.page + 1} >`}
        onClick={() => onPageClick(hiscoresState.page + 1)}
        className='flex-1 text-orange'
      />
    </div>
  );

  return (
    <PageContainer>
      <DocumentMeta {...meta} />
      <PageHeader>
        <PageTitle
          title={`Hiscores - Page ${hiscoresState.page}`}
          description='View the top cloggers and find your place among their ranks'
        />
      </PageHeader>
      <div className='flex flex-col h-full md:flex-row m-2 border-2 border-light md:overflow-hidden shadow-log'>
        <Button title='Show options' className='block md:hidden mb-2' onClick={showMenu} />
        {mobileButtonGroup}
        <div className='hidden md:flex flex-col md:w-1/5 p-5 bg-light text-lg' id='hiscores-menu'>
          <label className='text-white' htmlFor='account-type'>Account type:</label>
          <Select options={accountTypeOptions} onChange={onAccountTypeChange} />
          <form className='flex flex-col' onSubmit={(e) => onSearch(e) }>
            <label className='text-white'>Search:</label>
            <Input placeholder='Enter username...' onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.currentTarget.value ?? '') }/>
            <Button type='submit' title='Search' />
          </form>
          <label className='hidden md:block text-white'>Change page:</label>
          <Button
            title={hiscoresState.page > 1 ? `< Page ${hiscoresState.page - 1}` : '< Page 1'}
            onClick={() => onPageClick(hiscoresState.page - 1)}
            className='hidden md:block text-orange'
            disabled={hiscoresState.page == 1}
          />
          <Button
            title={`Page ${hiscoresState.page + 1} >`}
            onClick={() => onPageClick(hiscoresState.page + 1)}
            className='hidden md:block text-orange'
          />
        </div>
        {hiscoresState.isLoading ?
          <Spinner />
          :
          <>
            <Table data={hiscoresState.data} columns={TABLE_COLUMNS} highlightVal={search.toLowerCase()}/>
            {mobileButtonGroup}
          </>
        }
      </div>
    </PageContainer>
  );
};

export default Hiscores;
