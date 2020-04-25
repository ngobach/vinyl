/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment, FunctionComponent } from 'react';
import Helmet from 'react-helmet';

import log from '~/utils/log';
import Logo from '~/components/Logo';
import Nav from '~/components/Nav';
import NavItem from '~/components/NavItem';
import Block, { Color } from '~/components/Block';
import Artist, { DisplayMode } from '~/components/Artist';

const fixtures: {
  artist: Artist
} = {
  artist: {
    cover: 'https://i.pravatar.cc/300?u=random@email.com',
    id: '1xxxx',
    name: 'Fancy Boiz',
  }
};

const Example: FunctionComponent<{ title: string}> = ({ title, children }) => (
  <section
    css={css`
      margin-bottom: 2rem;
      &:last-of-type {
        margin-bottom: auto;
      }
    `}
  >
    <h2
      css={css`
        font-weight: 900;
        font-size: .8rem;
        line-height: 2;
        color: var(--color-gray);
      `
    }>
      { title }
    </h2>
    <div css={css`
      border-top: solid 1px var(--nord1);
      border-bottom: solid 1px var(--nord1);
      padding-top: .2rem;
      padding-bottom: .2rem;
    `}>
      { children }
    </div>
  </section>
);

const Spacer: FunctionComponent<{}> = () => (
  <div
    css={css`
      height: 1rem;
    `}
  />
);

const Kitchen: FunctionComponent<{}> = () => (
  <Fragment>
    <Helmet>
      <title>Kitchen sink</title>
    </Helmet>
    <main css={css`
      margin-left: auto;
      margin-right: auto;
      max-width: 1024px;
      padding-left: 2rem;
      padding-right: 2rem;
    `}>
      <h1 css={css`
        font-size: 2rem;
        font-weight: bold;
        margin-top: 3rem;
        margin-bottom: 3rem;
      `}>
        Kitchen sink
      </h1>

      <Example title="Logo">
        <Logo />
      </Example>

      <Example title="NavList">
        <div css={css`
          width: 200px;
        `}>
          <Nav>
            <NavItem iconName="radar" text="Radar" />
            <NavItem iconName="flash" text="Flash" />
          </Nav>
        </div>
      </Example>

      <Example title="Block">
        <Block title="Most loved songs" color={Color.White}>
          Any content can go here
        </Block>
      </Example>

      <Example title="Artist">
        <div css={css`width: 280px;`}>
          <Artist mode={DisplayMode.List} artist={fixtures.artist} onClick={(a) => log(a)} />
          <Spacer />
          <Artist mode={DisplayMode.Vertical} artist={fixtures.artist} onClick={(a) => log(a)} subline='See? It is easy'/>
          <Spacer />
          <Artist mode={DisplayMode.Horizontal} artist={fixtures.artist} onClick={(a) => log(a)} subline='See? It is easy' tag='No 1' />
        </div>
      </Example>
    </main>
  </Fragment>
);

export default Kitchen;
