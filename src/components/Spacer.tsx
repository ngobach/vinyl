import React from 'react';
import { css } from '@emotion/react';

interface Props {
  size: string;
}

const Spacer: React.FC<Props> = ({ size }) => (
  <div
    css={css`
      height: ${size};
    `}
  />
);

export default Spacer;
