import React, { useEffect, useState } from 'react';
import DocumentMeta from 'react-document-meta';
import { useNavigate, useParams } from 'react-router-dom';

import { AccountType } from '../app/constants';
import { useHiscores } from '../app/hooks/hiscores';
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
  const params = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [username, setUsername] = useState('');
  const [filter, setFilter] = useState<RankType>('ALL');
  const { hiscores, page, setPage, isLoading } = useHiscores(Number(params.page), filter, username);

  const accountTypeOptions: SelectOption[] = [{ title: 'All', value: 'ALL', selected: true }];

  for (const accountType in AccountType) {
    const optionTitle = toTitleCase(accountType.replace(/_/g, ' '));
    accountTypeOptions.push({
      title: optionTitle,
      value: accountType,
    });
  }

  /**
   * Set open hiscores page based off value provided in URL params
   */
  useEffect(() => {
    let paramsPage = Number(params.page);
    if (!paramsPage) {
      paramsPage = 1;
      updateUrl(`/${URL_PATH}/${paramsPage}`);
    }

    if (paramsPage != page) {
      setPage(paramsPage);
    }

    AnalyticsService.hsPageChangeEvent(page);
  }, [params.page]);

  useEffect(() => {
    updateUrl(`/${URL_PATH}/${page}`);
  }, [page]);

  const onPageClick = (page: number) => {
    setUsername('');
    navigate(`/${URL_PATH}/${page}`);
  };

  const onAccountTypeChange = (value: string) => {
    const newAccountType = value as RankType;
    setFilter(newAccountType);
  };

  const onSearchChange = (value: string) => {
    setSearch(value);
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setUsername(search);
    AnalyticsService.hsUserSearchEvent(username.toLowerCase().trim());
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
    title: `Hiscores | Page ${page}`,
  };

  const mobileButtonGroup = (
    <div className='flex md:hidden'>
      {page > 1 &&
        <Button
          title={`< Page ${page - 1}`}
          onClick={() => onPageClick(page - 1)}
          className='flex-1 text-orange'
        />
      }
      <Button
        title={`Page ${page + 1} >`}
        onClick={() => onPageClick(page + 1)}
        className='flex-1 text-orange'
      />
    </div>
  );

  return (
    <PageContainer>
      <DocumentMeta {...meta} />
      <PageHeader>
        <PageTitle
          title={`Hiscores - Page ${page}`}
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
            title={page > 1 ? `< Page ${page - 1}` : '< Page 1'}
            onClick={() => onPageClick(page - 1)}
            className='hidden md:block text-orange'
            disabled={page == 1}
          />
          <Button
            title={`Page ${page + 1} >`}
            onClick={() => onPageClick(page + 1)}
            className='hidden md:block text-orange'
          />
        </div>
        {isLoading ?
          <Spinner />
          :
          <>
            <Table data={hiscores} columns={TABLE_COLUMNS} highlightVal={search.toLowerCase()}/>
            {mobileButtonGroup}
          </>
        }
      </div>
    </PageContainer>
  );
};

export default Hiscores;
