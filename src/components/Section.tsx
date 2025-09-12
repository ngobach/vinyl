import React from 'react';
import { css } from '@emotion/react';
import { LinkTarget } from '@/types';
import Clickable from './Clickable';
import Text from './Text';

interface Props {
  title?: string;
  target?: LinkTarget;
}

const Section: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  target = {},
  children,
}) => (
  <section>
    {title && (
      <Clickable {...target}>
        <Text size="l" bold inline>
          {title}
        </Text>
      </Clickable>
    )}
    <div
      css={css`
        margin-top: ${title ? '1rem' : '0'};
        border-radius: 0.25rem;
        padding: 1rem;
        background: #0001;
      `}
    >
      {children}
    </div>
  </section>
);

export default Section;
