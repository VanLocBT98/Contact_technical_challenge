import React from 'react';
import './index.scss';

import { Outlet } from 'react-router-dom';
import Typography from '~/components/atoms/Typography';

interface IExampleLayoutProps {
  children?: React.ReactNode;
}

const ExampleLayout: React.FC<IExampleLayoutProps> = ({ children }) => {
  return (
    <div>
      <div className='c-exLayout'>
        <Typography content='Technical challenge Service Contact' modifiers={['700', 'deepSpaceSparkle', '32x48', 'center']} />
      </div>
      {children}
      <Outlet />
    </div>
  );
};

ExampleLayout.defaultProps = {
  children: undefined
};

export default React.memo(ExampleLayout);
