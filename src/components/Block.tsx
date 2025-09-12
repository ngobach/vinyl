import { css } from '@emotion/react';
import { FC, PropsWithChildren } from 'react';

export enum Color {
  White,
  Gray,
}

interface Props {
  title: string;
  color?: Color;
}

function colorToCode(color: Color): string {
  switch (color) {
    case Color.White:
      return 'var(--nord4)';
    case Color.Gray:
      return 'var(--nord3)';
  }
}

const Block: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  color = Color.Gray,
}) => {
  return (
    <section>
      <h2
        css={css`
          display: block;
          font-weight: 700;
          font-size: 80%;
          text-transform: uppercase;
          color: ${colorToCode(color)};
        `}
      >
        {title}
      </h2>
      <div
        css={css`
          margin-top: 0.5rem;
        `}
      >
        {children}
      </div>
    </section>
  );
};

export default Block;
