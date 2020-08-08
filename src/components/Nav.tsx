/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';

const Nav: React.FC = ({ children }) => (
  <ul>
    { children }
  </ul>
);

export default Nav;
