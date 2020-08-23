/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FC } from 'react';
import MQ from '~/utils/mq';

interface Props {
  error: Error;
}

const Panic: FC<Props> = ({ error }) => (
  <div css={css`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  `}>
    <div
      css={css`
        display: flex;
        align-items: center;
        ${MQ.Small} {
          flex-flow: column;
        }
      `}
    >
      <i
        className={`im im-bug`}
        css={css`
          display: block;
          margin-right: 3rem;
          font-size: 8rem;
          color: var(--nord3);
          line-height: 1.5;
          ${MQ.Small} {
            margin: 0 auto;
            font-size: 4rem;
          }
        `}
      />
      <div
        css={css`
          width: 400px;
          padding-left: 3rem;
          border-left: solid 1px var(--nord3);
          color: var(--nord3);
          ${MQ.Small} {
            border-left: none;
            width: 100%;
            padding: 0 2rem;
            text-align: center;
          }
        `}
      >
        <h1
          css={css`
            font-size: 2rem;
            font-weight: 100;
            color: var(--nord4);
            ${MQ.Small} {
              font-size: 1.5rem;
            }
          `}
        >
          Oh snap!
        </h1>
        <p
          css={css`
            margin-top: .5rem;
            color: var(--nord4);
          `}
        >
          Some error happened that we are unable to continue.
          <pre
            css={css`
              margin-top: .5rem;
              padding: .25rem .5rem;
              border-radius: .25rem;
              background: var(--nord1);
              font-size: 0.8rem;
              white-space: pre-wrap;
            `}
          >
            <code>{error.message}</code>
          </pre>
        </p>
      </div>
    </div>
  </div>
);

export default Panic;
