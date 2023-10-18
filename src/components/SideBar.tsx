/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import type MediaList from '@/services/medialist';
import * as env from '@/env';
import Clickable from './Clickable';
import Logo from './Logo';
import Block from './Block';
import Nav from './Nav';
import NavItem from './NavItem';
import Spacer from './Spacer';

type Props = {
  medialist: MediaList;
  slot: React.ReactNode;
};

const SideBar: React.FC<Props> = ({ medialist, slot }) => (
  <div
    css={css`
      position: sticky;
      top: 0;
      padding-bottom: 1rem;
    `}
  >
    <div
      css={css`
        display: flex;
        justify-content: center;
        padding: 0 0 2rem;
      `}
    >
      <Clickable href="/">
        <Logo size={120} />
      </Clickable>
    </div>

    {/* Portal for page specific content */}
    {slot}
    <Block title="Playlists">
      <Nav>
        <NavItem
          iconName="care-right"
          text="Today Mood"
          target={{ href: '/today' }}
        />
        <NavItem
          iconName="layer"
          text="All Tracks"
          target={{ href: '/tracks' }}
        />
        <NavItem
          iconName="heart"
          text="Favorites"
          target={{ href: '/favorites' }}
        />
        <NavItem
          iconName="history"
          text="History"
          target={{ href: '/history' }}
        />
        <NavItem
          iconName="coffee"
          text="Artists"
          target={{ href: '/artists' }}
        />
      </Nav>
    </Block>
    <Spacer size="2rem" />

    <Block title="Vinyl">
      <div
        css={css`
          font-family: var(--font-mono);
          font-size: 75%;
          color: var(--color-gray);
        `}
      >
        <dl>
          <dt
            css={css`
              font-weight: bold;
            `}
          >
            Build target
          </dt>
          <dd>{env.DEV ? 'dev' : 'prod'}</dd>
          <dt
            css={css`
              font-weight: bold;
            `}
          >
            Revision
          </dt>
          <dd>{env.REVISION}</dd>
          <dt
            css={css`
              font-weight: bold;
            `}
          >
            DB
          </dt>
          <dd>
            <a
              href={env.MEDIA_SOURCE}
              css={css`
                text-decoration: none;
                color: inherit;
              `}
            >
              Link
            </a>
          </dd>
        </dl>
      </div>
    </Block>
  </div>
);

export default SideBar;
