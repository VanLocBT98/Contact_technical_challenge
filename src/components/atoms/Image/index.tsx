import React from 'react';
import { ModifierUtils } from '~/utils';
import './index.scss';

export type SizeImageType = 'contain' | 'cover';

export interface ImageProps {
  src?: string;
  srcTablet?: string;
  srcMobile?: string;
  alt?: string;
  ratio?: Ratio;
  size?: SizeImageType;
  loading?: 'lazy' | 'eager';
}

const Image: React.FC<ImageProps> = ({
  src, srcTablet, srcMobile, alt, ratio, size, loading
}) => (
  <picture className={ModifierUtils.map('a-image', ratio, size)}>
    <source srcSet={srcMobile} media="(max-width:576px)" />
    <source srcSet={srcTablet} media="(max-width:992px)" />
    <img src={src} alt={alt} loading={loading} />
  </picture>
);

Image.defaultProps = {
  ratio: '1x1',
  loading: 'lazy',
  size: 'cover'
};

export default Image;
