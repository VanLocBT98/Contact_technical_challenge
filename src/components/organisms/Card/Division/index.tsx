import React from 'react';

import Icon from '~/components/atoms/Icon';
import Image from '~/components/atoms/Image';
import Link from '~/components/atoms/Link';
import Typography from '~/components/atoms/Typography';
import './index.scss';
export interface CardDivisionProps {
  thumbnail?: string;
  title?: string;
  description?: string;
  link?: LinkTypes;
}

const CardDivision: React.FC<CardDivisionProps> = ({
  thumbnail,
  title,
  description,
  link
}) => (
  <div className="o-cardDivision">
    <Link href={link?.url} target={link?.target}>
      <div className="o-cardDivision_wrap">
        <div className="o-cardDivision_image">
          <Image src={thumbnail} ratio="354x221" alt={title} />
        </div>
        <div className="o-cardDivision_content">
          <div className="o-cardDivision_content-title">
            <Typography
              type="h6"
              content={title}
              inline
              modifiers={['20x40', '700', 'deepSpaceSparkle',]}
            />
          </div>
          <div className="o-cardDivision_desc u-mt-5">
            <Typography
              type="p"
              content={description}
              modifiers={['16x28', '400', 'darkLiver']}
            />
          </div>
          <div className="o-cardDivision_bottomLine u-mt-12 animate animate-arrowSlide">
            <Typography
              type="p"
              modifiers={['14x21', 'darkLiver']}
              content={link?.text}
            />
            <div className="u-ml-8">
              <Icon iconName="arrow_teal" size="16x16" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

export default React.memo(CardDivision);
