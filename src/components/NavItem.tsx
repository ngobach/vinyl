/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import Clickable from './Clickable';
import { LinkTarget } from '~/types';

interface Props {
    iconName: string;
    text: string;
    target?: LinkTarget;
}

const NavItem: React.FC<Props> = ({ iconName, text, target = {} }) => (
    <Clickable {...target}>
        <li
            css={css`
                padding-top: .4em;
                padding-bottom: .4em;
                display: flex;
                align-items: center;
                font-size: 18px;
                cursor: pointer;
            `}
        >
            <i className={`im im-${iconName}`} css={css`
                font-size: 1em;
                display: block;
                width: 1.2em;
                color: var(--color-primary1);
                position: relative;
                bottom: -2px;
            `}/>
            <span css={css`
                display: block;
                margin-left: .75rem;
                color: var(--nord4);
                font-weight: 700;
                left: 0;
            `}>
                { text }
            </span>
        </li>
    </Clickable>
);

export default NavItem;
