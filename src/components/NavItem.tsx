/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import mq from '~/utils/mq';

interface Props {
  iconName: string;
  text: string;
  onClick?: () => any;
}

const NavItem: React.FC<Props> = ({ iconName, text, onClick }) => (
  <li
    css={css`
      padding-top: .2em;
      padding-bottom: .2em;
      display: flex;
      align-items: center;
      font-size: 18px;
      cursor: pointer;
    `}
    onClick={() => onClick && onClick()}
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
);

export default NavItem;
