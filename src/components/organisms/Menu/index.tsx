import React from 'react';

import { Menu } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import './index.scss';

export interface IMenuProps {
  children?: React.ReactNode;
  items?: ItemType[];
  selectedKey: string;
  openKeys: string[];
  onOpenChange: (keys: string[]) => void;
}

const MenuLayout: React.FC<IMenuProps> = ({
  children,
  items,
  selectedKey,
  openKeys,
  onOpenChange
}) => {
  return (
    <div>
      <Menu
        style={{ width: 256 }}
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        mode='inline'
        items={items}
        onOpenChange={onOpenChange}
      />
      {children}
    </div>
  );
};

export default MenuLayout;
