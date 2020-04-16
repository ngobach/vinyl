/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FunctionComponent } from 'react';
import LogoImage from '~/assets/img/soundwave.svg';

interface Props {
  size?: number;
}

const Logo: FunctionComponent<Props> = ({ size = 64 }) => (
    <img
      src={LogoImage}
      css={css`
        display: block;
        width: auto;
      `}
      style={{
        height: `${size}px`,
      }}
    />
);

export default Logo;
