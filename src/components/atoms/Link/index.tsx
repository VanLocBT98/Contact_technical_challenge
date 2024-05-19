import React from 'react';
import { NavLink as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
export interface LinkProps extends Omit<RouterLinkProps, 'to'> {
  children?: React.ReactNode;
  href?: string;
  search?: string;
  useExternal?: boolean;
}

const Link: React.FC<LinkProps> = ({
  children, href, search, useExternal, ...props
}) => {
  if (!href) {
    return (
      <span
        className="a-link"
        {...props}
      >
        {children}
      </span>
    );
  }

  if (href?.includes('http') || useExternal) {
    return (
      <a
        className="a-link"
        {...props}
        href={href}
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink
      className="a-link"
      {...props}
      to={search ? {
        pathname: href,
        search
      } : href}
      aria-label="label"
      end
    >
      {children}
    </RouterLink>
  );
};

export default Link;
