/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-indent */
import React, { forwardRef } from 'react';
import Typography from '~/components/atoms/Typography';
import { ModifierUtils } from '~/utils';
import './index.scss';

type Variant = 'contact';

interface TextAreaProps {
  id: string;
  label?: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  error?: string;
  colorError?: 'white';
  value?: string;
  disabled?: boolean;
  handleOnchange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  modifiers?: GeneralTextStyle[];
  variant?: Variant,
  readOnly: boolean,
  onKeyPress?: React.KeyboardEventHandler<HTMLTextAreaElement>
}

const TextAreaRef: React.ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextAreaProps
> = (
  {
    id,
    label,
    required,
    rows = 4,
    placeholder,
    error,
    colorError,
    value,
    disabled,
    handleOnchange = () => { },
    modifiers,
    variant,
    readOnly = false,
    onKeyPress
  },
  ref,
) => (
    <div className={ModifierUtils.map('a-textarea', modifiers, variant)}>
      {label && (
        <div className="a-textarea_label">
          <label htmlFor={id}>
            <Typography content={label} modifiers={['black', '14x21', '400', 'capitalize']} />
          </label>
          {required && <span className="a-textarea_label-required">*</span>}
        </div>
      )}
      <textarea
        name={id}
        className={ModifierUtils.map('a-textarea_input', error && 'error', modifiers, variant)}
        value={value}
        ref={ref}
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleOnchange}
        id={id}
        readOnly={readOnly}
        onKeyPress={onKeyPress}
      />
      {error && (
        <span className={ModifierUtils.map('a-textarea_error', colorError)}>
          {error}
        </span>
      )}
    </div>
  );

const TextArea = forwardRef(TextAreaRef);

export default TextArea;
