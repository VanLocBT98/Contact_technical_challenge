import React, { forwardRef } from 'react';

import Icon, { IconName, IconSize } from '~/components/atoms/Icon';
import Typography from '~/components/atoms/Typography';

import { ModifierUtils } from '~/utils';
import './index.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'borderRadius' | 'contactForm' | 'inputSearch';
  type?: 'text' | 'number' | 'email' | 'password';
  error?: string;
  label?: string;
  id: string;
  iconName?: IconName;
  iconSize?: IconSize;
  handleClickIcon?: () => void;
}

const InputRef: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { type, error, label, id, variant, iconName, iconSize, handleClickIcon, disabled, ...props },
  ref
) => (
  <div
    className={ModifierUtils.map(
      'a-input',
      variant,
      type,
      disabled && 'disabled',
      iconName && 'hasIcon',
      error && 'isError'
    )}
  >
    {label && (
      <label className='a-input_label' htmlFor={id}>
        <Typography content={label} modifiers={['black', '14x21', '400', 'capitalize']} />
      </label>
    )}
    <div className='a-input_wrap'>
      <input
        {...props}
        id={id}
        className='a-input_input'
        type={type}
        ref={ref}
        disabled={disabled}
      />
      {iconName && (
        <button
          className='a-input_icon'
          type='submit'
          onClick={() => {
            if (handleClickIcon && !disabled) handleClickIcon();
          }}
        >
          <Icon iconName={iconName} size={iconSize} />
        </button>
      )}
    </div>

    {error && <span className='a-input_error'>{error}</span>}
  </div>
);
const Input = forwardRef(InputRef);

Input.defaultProps = {
  type: 'text',
  iconSize: '17x17',
  variant: 'default'
};

export default Input;
