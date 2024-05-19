---
to: src/pages/<%= h.changeCase.pascalCase(name) %>/index.tsx
---
import React from 'react';
import './index.scss';

interface I<%= h.changeCase.pascalCase(name) %>Props {
  children?: React.ReactNode;
}

const <%= h.changeCase.pascalCase(name) %>: React.FC<I<%= h.changeCase.pascalCase(name) %>Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default <%= h.changeCase.pascalCase(name) %>;
