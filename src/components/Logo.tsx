/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FunctionComponent } from 'react';

interface Props {
  size?: number;
}

const Logo: FunctionComponent<Props> = ({ size }) => (
  <div
    css={css`
      display: inline-block;
      background: rgb(129,193,189);
      background: linear-gradient(45deg, rgba(129,193,189,1) 0%, rgba(94,129,172,1) 100%);
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      font-weight: 400;
      font-size: 22px;
    `}
    style={{
      ...(size ? { fontSize: `${size}px` } : {}),
    }}
  >
    <i className="im im-headphones" css={css`display: inline; line-height: 1.2; font-size: 1em`}></i>
    <span css={css`font-size: 1.4em`}>Vinyl</span>
  </div>
);

export default Logo;
