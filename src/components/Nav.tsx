import React from 'react';

const Nav: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ul>{children}</ul>
);

export default Nav;
