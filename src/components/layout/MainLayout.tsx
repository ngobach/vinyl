/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import BlankLayout from './BlankLayout';

interface Props {
  sidebar?: React.ReactNode;
  playerArea?: React.ReactNode;
  title?: string;
}

const SIDEBAR_SIZE = '200px';

const MainLayout: React.FC<Props> = ({
  sidebar,
  title,
  playerArea,
  children,
}) => {
  return (
    <BlankLayout>
      <main
        css={css`
          position: relative;
          display: flex;
          width: 100%;
          min-height: 100%;
          ${playerArea
            ? css`
                padding-bottom: calc(60px + 2rem);
              `
            : css`
                padding-bottom: 2rem;
              `}
          @media (min-height: 800px) {
            padding-top: 2rem;
          }
        `}
      >
        <div
          css={css`
            width: ${SIDEBAR_SIZE};
          `}
        >
          {sidebar}
        </div>
        <div
          css={css`
            flex: 1;
            overflow: hidden;
          `}
        >
          <div
            css={css`
              display: flex;
              height: 150px;
              padding: 0 0 0.8rem;
              justify-content: center;
              align-items: flex-end;
              font-size: 2rem;
              font-weight: bold;
            `}
            className="font-display"
          >
            {title}
          </div>
          {children}
        </div>
      </main>
      {playerArea && (
        <div
          css={css`
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
          `}
        >
          <div
            css={css`
              max-width: 1024px;
              margin: 0 auto;
              padding-left: ${SIDEBAR_SIZE};
            `}
          >
            {playerArea}
          </div>
        </div>
      )}
    </BlankLayout>
  );
};

export default MainLayout;
