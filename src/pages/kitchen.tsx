/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment, FunctionComponent } from 'react';
import Helmet from 'react-helmet';

import Logo from '~/components/Logo';
import Nav from '~/components/Nav';
import NavItem from '~/components/NavItem';
import Block, { Color } from '~/components/Block';

const styles = {
  headline: css`
    font-weight: 100;
    font-size: 1.5rem;
    line-height: 2;
    `,
};

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
      <section>
        <h2 css={styles.headline}>Logo</h2>
        <Logo />
      </section>

      <section>
        <h2 css={styles.headline}>NavList</h2>
        <div css={css`
          width: 200px;
        `}>
          <Nav>
            <NavItem iconName="radar" text="Radar" />
            <NavItem iconName="flash" text="Flash" />
          </Nav>
        </div>
      </section>

      <section>
        <h2 css={styles.headline}>Block</h2>
        <Block text="ahihi" color={Color.White}>
          Any content can go here
        </Block>
      </section>
    </main>
  </Fragment>
);

export default Kitchen;
