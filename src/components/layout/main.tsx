/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';

const MainLayout: React.FC = ({}) => (
  <main css={css`
    display: flex;
    height: 100vh;
    background: #ff0000;
  `}>
  </main>
);

export default MainLayout;
