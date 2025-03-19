import React, { ReactNode, useEffect, useState } from 'react';
import './index.scss';

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { MenuProps } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';

import Link from '~/components/atoms/Link';
import Typography from '~/components/atoms/Typography';
import MenuLayout from '~/components/organisms/Menu';
import { contactService } from '~/shares/services/contact/index.service';
import { useStore } from '~/shares/stores';
import { IOlympicData } from '~/types';
interface MenuItem {
  key: string;
  path?: string;
  children?: MenuItem[];
}

const getMenuKeyFromPath = (path: string, menuItems: MenuItem[]): string => {
  const cleanedPath = path.replace(/\/edit\/.*/, '');

  const findKey = (items: MenuItem[], currentPath: string): string | null => {
    for (const item of items) {
      if (item.children) {
        const found = findKey(item.children, currentPath);
        if (found) return found;
      } else if (item.key === currentPath) {
        return item.key;
      }
    }
    return null;
  };

  return findKey(menuItems, cleanedPath) || '';
};

const menuItems = [
  {
    key: 'home',
    icon: <MailOutlined />,
    label: 'Navigation One',
    children: [
      {
        label: <Link href='/'>Ag Grid</Link>,
        key: '/'
      }
    ]
  },
  {
    key: 'sub2',
    icon: <AppstoreOutlined />,
    label: 'Navigation Two',
    children: [
      {
        key: '/services/standard',
        label: <Link href='/services/standard'>Enterprice Table</Link>
      }
    ]
  },
  {
    key: 'sub3',
    icon: <SettingOutlined />,
    label: 'Navigation Three',
    children: [
      {
        label: <Link href='/services/normal'>Tanstack Table</Link>,
        key: '/services/normal'
      },
      {
        label: <Link href='/services/premium'>MUI Premium</Link>,
        key: '/services/premium'
      }
    ]
  }
];
interface ExampleLayoutProps {
  children?: ReactNode;
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
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState('1');
  const [openKeys, setOpenKeys] = useState<string[]>(['/']);

  const handleOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys as string[]);
  };

  useEffect(() => {
    const selectedKeyActive = getMenuKeyFromPath(location.pathname, menuItems);
    setSelectedKey(selectedKeyActive);
    const findOpenKey = (items: MenuItem[], key: string): string | null => {
      for (const item of items) {
        if (item.children) {
          if (item.children.some((child) => child.key === key)) {
            return item.key;
          }
          const found = findOpenKey(item.children, key);
          if (found) return found;
        }
      }
      return null;
    };
    const openKey = findOpenKey(menuItems, selectedKeyActive);
    if (openKey && !openKeys.includes(openKey)) {
      setOpenKeys([...openKeys, openKey]);
    }
  }, [location, menuItems]);
  return isLoading && list.length === 0 ? (
    '...Loading'
  ) : (
    <div>
      <MenuLayout
        items={menuItems}
        selectedKey={selectedKey}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
      >
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
          <Link href='/services/standard/edit/1998'>Enterprice Table Edit </Link>

          <Link href='/services/premium'>MUI Premium</Link>
        </div>
        {children}
        <Outlet />
      </MenuLayout>
    </div>
  );
};

export default React.memo(ExampleLayout);
