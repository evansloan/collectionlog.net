import React, { useEffect } from 'react';
import DocumentMeta from 'react-document-meta';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  FilterType,
  loadHiscores,
  searchHiscores,
  setAccountType,
  setPage,
  setUsername,
} from '../app/reducers/hiscores/slice';
import Button from '../components/elements/Button';
import Input from '../components/elements/Input';
import PageTitle from '../components/elements/PageTitle';
import Spinner from '../components/elements/Spinner';
import Table, { ColumnType } from '../components/elements/Table';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import { updateUrl } from '../utils';

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

  /**
   * Load hiscores data from API.
   *
   * Called on page load
   */
  useEffect(() => {
    let page = Number(params.page);
    const filter = hiscoresState.accountType;
    if (!page) {
      page = 1;
      updateUrl(`/hiscores/${page}`);
    }

    dispatch(setPage(page));
    dispatch(loadHiscores({ page, filter }));
  }, [params.page]);

  useEffect(() => {
    const { page } = hiscoresState;
    navigate(`/hiscores/${page}`);
  }, [hiscoresState.page]);

  const onPageClick = (page: number) => {
    navigate(`/hiscores/${page}`);
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
    dispatch(setUsername(value));
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(searchHiscores(hiscoresState.username ?? ''));
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
        <div className='hidden md:flex flex-col p-5 bg-light text-lg' id='hiscores-menu'>
          <label className='text-white' htmlFor='account-type'>Account type:</label>
          <select
            className='p-2 bg-primary border-2 border-light text-orange text-shadow'
            name='account-type'
            id='account-type'
            onChange={(e) => onAccountTypeChange(e.target.value)}
          >
            <option value='ALL'>All</option>
            <option value='NORMAL'>Normal</option>
            <option value='IRONMAN'>Ironman</option>
            <option value='HARDCORE_IRONMAN'>Hardcore Ironman</option>
            <option value='ULTIMATE_IRONMAN'>Ultimate Ironman</option>
            <option value='GROUP_IRONMAN'>Group Ironman</option>
            <option value='HARDCORE_GROUP_IRONMAN'>Hardcore Group Ironman</option>
          </select>
          <form className='flex flex-col' onSubmit={(e) => onSearch(e) }>
            <label className='text-white'>Search:</label>
            <Input placeholder='Enter username...' onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.currentTarget.value ?? '') }/>
            <Button type='submit' title='Search' />
          </form>
          <label className='text-white'>Change page:</label>
          {hiscoresState.page > 1 &&
            <Button
              title={`< Page ${hiscoresState.page - 1}`}
              onClick={() => onPageClick(hiscoresState.page - 1)}
              className='text-orange'
            />
          }
          <Button
            title={`Page ${hiscoresState.page + 1} >`}
            onClick={() => onPageClick(hiscoresState.page + 1)}
            className='text-orange'
          />
        </div>
        {hiscoresState.isLoading ?
          <Spinner />
          :
          <Table data={hiscoresState.data} columns={TABLE_COLUMNS} highlightVal={hiscoresState.username}/>
        }
      </div>
    </PageContainer>
  );
};

export default Hiscores;
