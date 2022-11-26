/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FCWithTitle } from '../types';
import ImgSourceCode from '~/assets/img/undraw_source_code_xx2e.svg';

const Building: FCWithTitle = () => (
  <main>
    <img
    src={ImgSourceCode}
    css={css`
        display: block;
        margin: auto;
        margin-top: 4rem;
        width: 500px;
        height: auto;
    `}
    />
  </main>
);

Building.title = 'Under construction';

export default Building;
