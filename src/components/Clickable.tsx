/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { LinkTarget } from '~/types';
import { Link } from 'react-router-dom';

type Props = LinkTarget & {
    box?: 'inline-block' | 'block';
};

const Clickable: React.FC<Props> = ({ box = 'inline-block', href, onClick, children }) => {
    return href ? (
        <Link to={href} css={css`
            text-decoration: none;
        `}>
          {children}
        </Link>
    ) : (
        <div css={box === 'inline-block' ? css`
            display: inline-block;
        ` : null} onClick={onClick}>
            {children}
        </div>
    );
};

export default Clickable;
