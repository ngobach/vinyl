/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FunctionComponent } from 'react';

export enum Color {
  White,
  Gray,
}

interface Props {
  title: string;
  color?: Color;
}

function colorToCode (color: Color): string {
  switch (color) {
    case Color.White:
      return 'var(--nord4)';
    case Color.Gray:
      return 'var(--nord3)';
  }
}

const Block: FunctionComponent<Props> = ({ children, title, color = Color.Gray }) => {
  return (
    <section>
      <h2
        css={css`
          display: block;
          font-weight: 700;
          color: ${colorToCode(color)};
        `}
      >
        { title }
      </h2>
      <div
        css={css`
          margin-top: .5rem;
        `}
      >
        { children }
      </div>
    </section>
  );
};

export default Block;