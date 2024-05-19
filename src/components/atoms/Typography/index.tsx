import React from 'react';

import DOMPurify from 'dompurify';

import { ModifierUtils } from '~/utils';

import './index.scss';

type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type Paragraph = 'p' | 'span' | 'div';
type Sizes =
  | '16x24'
  | '24x36'
  | '12x18'
  | '16x28'
  | '20x40'
  | '14x21'
  | '32x48'

type Cursors = 'pointer' | 'all-scroll' | 'default';
export interface TypographyProps {
  type?: Heading | Paragraph;
  content?: string;
  modifiers?: (GeneralTextStyle | Sizes)[];
  children?: React.ReactNode;
  inline?: boolean;
  cursor?: Cursors | 'default';
  active?: boolean;
  onClick?: () => void;
}

const Typography: React.FC<TypographyProps> = ({
  type,
  content,
  modifiers,
  children,
  inline,
  cursor,
  active,
  onClick,
  ...props
}) => {
  const Element = type || 'h4';

  if (content) {
    return (
      <Element
        onClick={onClick}
        className={ModifierUtils.map('a-typography', modifiers, cursor, active && 'active')}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content, { ADD_TAGS: ['iframe'] }) }}
        {...props}
      />
    );
  }

  return (
    <Element
      onClick={onClick}
      className={ModifierUtils.map(
        'a-typography',
        modifiers,
        inline && 'inline',
        cursor,
        active && 'active'
      )}
      {...props}
    >
      {children}
    </Element>
  );
};

export default Typography;
