import { css, jsx } from '@emotion/core';
/** @jsx jsx */

const App = () => (
  <div>
    <h1
      css={css`
        font-size: 2rem;
        font-weight: 900;
        &:hover {
          font-weight: 100;
        }
      `}
    >
      DOM CONTENT
    </h1>
  </div>
);

export default App;
