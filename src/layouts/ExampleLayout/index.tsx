import React, { ReactNode } from 'react';
import './index.scss';

import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

import Link from '~/components/atoms/Link';
import Typography from '~/components/atoms/Typography';
import { contactService } from '~/shares/services/contact/index.service';
import { useStore } from '~/shares/stores';
import { IOlympicData } from '~/types';

interface ExampleLayoutProps {
  children: ReactNode;
}

const ExampleLayout: React.FC<ExampleLayoutProps> = ({ children }) => {
  const {
    MockData: { list, fetchOlympicData }
  } = useStore();
  const { isLoading } = useQuery({
    queryKey: ['olympicData'],
    queryFn: contactService.contact,
    onSuccess: (data) => {
      fetchOlympicData(data as IOlympicData[]);
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false
  });

  return isLoading && list.length === 0 ? (
    '...Loading'
  ) : (
    <div>
      <div className='c-exLayout'>
        <Typography
          content='Check Table'
          modifiers={['700', 'deepSpaceSparkle', '32x48', 'center']}
        />
      </div>
      <div className='c-exLayout'>
        <Link href='/'>Ag Grid</Link>
        <Link href='/services/normal'>Tanstack Table</Link>
        <Link href='/services/standard'>Enterprice Table</Link>
        <Link href='/services/premium'>MUI Premium</Link>
      </div>
      {children}
      <Outlet />
    </div>
  );
};

export default React.memo(ExampleLayout);
