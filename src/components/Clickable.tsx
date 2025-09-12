import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { LinkTarget } from '@/types';

const Clickable: React.FC<
  React.PropsWithChildren<
    LinkTarget & {
      box?: 'inline-block' | 'block';
    }
  >
> = ({ box = 'inline-block', href, onClick, children }) => {
  return href ? (
    <Link
      to={href}
      css={css`
        text-decoration: none;
      `}
    >
      {children}
    </Link>
  ) : onClick ? (
    <div
      css={
        box === 'inline-block'
          ? css`
              display: inline-block;
              cursor: pointer;
            `
          : null
      }
      onClick={onClick}
    >
      {children}
    </div>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
};

export default Clickable;
