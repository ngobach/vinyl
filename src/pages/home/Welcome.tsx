/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import excuses from 'excuses';

import Text from '@/components/Text';
import { FCWithTitle } from '../types';

import ImgIllustration from '@/assets/img/undraw_launch_day_4e04.svg';
import Spacer from '@/components/Spacer';

const Welcome: FCWithTitle = () => {
  const excuse = React.useRef(excuses.developers.getRandom());

  return (
    <main
      css={css`
        padding: 2rem;
        padding-top: 4rem;
      `}
    >
      <div
        css={css`
          text-align: center;
        `}
      >
        <img
          src={ImgIllustration}
          css={css`
            width: 320px;
            height: auto;
          `}
        />
      </div>
      <Spacer size="1rem" />

      <Text size="l" align="center">
        {excuse.current.replace(/(\w)$/, '$1.')}
      </Text>
      <Text align="center" color="var(--color-primary2)">
        - developer excuse
      </Text>
    </main>
  );
};

Welcome.title = 'Hi.';

export default Welcome;
