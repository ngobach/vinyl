import { css } from '@emotion/react';
import React from 'react';

const BlankLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <main
    css={css`
      height: 1px;
      min-height: 100vh;
      max-width: 1024px;
      padding: 0 1rem;
      margin: 0 auto;
    `}
  >
    {children}
  </main>
);

export default BlankLayout;
