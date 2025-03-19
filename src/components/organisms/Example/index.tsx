import React from 'react';
import './index.scss';

interface IExampleProps {
  children?: React.ReactNode;
}

const Example: React.FC<IExampleProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Example;
