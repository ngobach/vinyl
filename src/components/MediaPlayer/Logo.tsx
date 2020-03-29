/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FunctionComponent } from 'react';

const Logo: FunctionComponent<{}> = () => (
  <div
    css={css`
      background-color: #FBAB7E;
      background-image: linear-gradient(104deg, #FBAB7E 0%, #F7CE68 100%);
    `}
  >
    Vinyl
  </div>
);

export default Logo;
