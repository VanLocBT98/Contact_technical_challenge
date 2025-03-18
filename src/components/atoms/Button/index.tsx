import React from 'react';

import { Button as AntdButton, ButtonProps } from 'antd';

import { ModifierUtils } from '~/shares/utils';
import './index.scss';

type Sizes = 'h30' | 'h36';
type Variant = 'primary' | 'cancel' | 'md';
export interface IButtonProps extends ButtonProps {
  modifiers?: (Variant | Sizes)[];
}

const Button: React.FC<IButtonProps> = ({ children, modifiers, className, loading, ...props }) => {
  return (
    <AntdButton
      {...props}
      loading={loading}
      className={ModifierUtils.map('a-button', modifiers, className, loading && 'loading')}
    >
      {children}
    </AntdButton>
  );
};

export default Button;
