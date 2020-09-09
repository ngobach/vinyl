/** @jsx jsx */
import React from 'react';
import {jsx, css } from '@emotion/core';

interface Props {
    size?: keyof typeof sizes;
    bold?: boolean;
    color?: string;
    inline?: boolean;
    align?: 'left' | 'center' | 'right';
    children: string;
}

const sizes = {
    sm: '0.8rem',
    m: '1rem',
    l: '1.5rem',
    xl: '2rem',
    xxl: '4rem',
};

const Text: React.FC<Props> = ({
    size = 'm',
    bold,
    color,
    children,
    inline,
    align = 'right',
}) => (
    <div css={css`
        font-size: ${sizes[size]};
        text-align: ${align};
        ${inline && css`
            display: inline;
        `}
        ${bold && css`
            font-weight: bold;
        `}
        ${bold && css`
            font-weight: bold;
        `}
        ${color && css`
            color: ${color};
        `}
    `}>
        {children}
    </div>
);

export default Text;
