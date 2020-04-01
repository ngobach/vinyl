/** @jsx jsx */
import { jsx } from '@emotion/core';

const Nav: React.FunctionComponent<{}> = ({ children }) => (
  <ul>
    { children }
  </ul>
);

export default Nav;
