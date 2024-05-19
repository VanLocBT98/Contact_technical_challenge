import React from 'react';

import { ModifierUtils } from '~/utils';
import './index.scss';

export const iconList = {
  search: 'search',
  searchCoolBlack: 'searchCoolBlack',
  close_white: 'close_white',
  close_teal: 'close_teal',
  arrow_teal: 'arrow_teal'
};

export type IconName = keyof typeof iconList;

export type IconSize = '17x17' | '24x24' | '32x32' | '16x16';

interface IconProps {
  iconName?: IconName;
  size?: IconSize;
}

const Icon: React.FC<IconProps> = ({ iconName, size }) => (
  <i className={ModifierUtils.map('a-icon', iconName, size)} />
);

Icon.defaultProps = {
  size: '24x24'
};

export default Icon;
