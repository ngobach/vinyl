/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FC } from 'react';
import { sample } from 'lodash';

const randomIconList: string[] = [
  'headphones',
  'spotify',
  'play',
  'flash',
  'star',
  'pulse',
];

const defaultIcon: string = 'pulse';

const randomIcon: string = sample(randomIconList);

interface Props {
  progress: number;
  random: boolean;
}

const Loader: FC<Props> = ({ progress, random = false }) => {
  const icon: string = random ? randomIcon : defaultIcon;

  return (
    <div css={css`
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
    `}>
      <div
        css={css`
          position: relative;
        `}
      >
        <i
          className={`im im-${icon}`}
          css={css`
            display: block;
            font-size: 8rem;
            color: var(--nord3);
            line-height: 1.5;
            -webkit-text-stroke: 8px var(--nord3);
          `}
        />
        <i
          className={`im im-${icon}`}
          css={css`
            display: block;
            line-height: 1.5;
            position: absolute;
            overflow: hidden;
            top: 0;
            left: 0;
            font-size: 8rem;
            color: var(--nord1);
            background-image: linear-gradient(90deg, var(--nord13), var(--nord11));
            background-size: 150px 150px;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          `}
          style={{
            width: `${progress * 100}%`
          }}
        />
      </div>
    </div>
  );
};

export default Loader;
