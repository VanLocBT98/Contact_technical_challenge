import React from 'react';

import imgLoading from '~/assets/images/loading.gif';
import { ModifierUtils } from '~/utils';

import './index.scss';

type Sizes = 'h30' | 'h36';
type Variant = 'primary' | 'cancel' | 'md';
export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  modifiers?: (Variant | Sizes)[];
  sizeImg?: string;
  isLoading?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  children,
  modifiers,
  name,
  id,
  className,
  isLoading,
  disabled,
  type = 'button',
  sizeImg,
  onClick
}) => {
  return (
    <button
      id={id}
      name={name}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={ModifierUtils.map('a-button', modifiers, className, isLoading && 'loading')}
    >
      {isLoading ? (
        <img src={imgLoading} alt='loading' width={sizeImg} height={sizeImg} />
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

Button.defaultProps = {
  children: undefined
};

export default Button;
