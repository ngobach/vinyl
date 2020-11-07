/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FC, useState, useRef, useCallback } from 'react';

const SliderLabel: FC<{mr?: boolean, ml?: boolean}> = ({ children, ml, mr }) => (
  <div css={[css`
    color: var(--color-gray);
    font-size: .8rem;
  `, mr && css`
    margin-right: .5em;
  `, ml && css`
    margin-left: .5em;
  `]}>
    {children}
  </div>
);

interface SliderProps {
  value: number;
  onSeek: (newValue: number) => void;
  pre?: React.ReactNode;
  post?: React.ReactNode;
}

const Slider: FC<SliderProps> = ({
  value,
  onSeek,
  pre,
  post,
  ...rest
}) => {
  const [override, setOverride] = useState(0);
  const [capturing, setCapturing] = useState(false);
  const displayedValue = capturing ? override : value;
  const holder = useRef(null);

  const fromEvent = useCallback((e) => {
    const clientRect = holder.current.getBoundingClientRect();
    const v = (e.pageX - clientRect.left) / clientRect.width;
    setOverride(v);
    setCapturing(true);
  }, [setOverride, setCapturing]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
      `}
      {...rest}
    >
      {pre && <SliderLabel mr>{pre}</SliderLabel>}
      <div
        css={css`
          flex: 1;
          position: relative;
          height: 16px;
        `}
      >
        <i
          ref={holder}
          css={css`
            position: absolute;
            left: 0;
            height: 100%;
            width: 100%;
            border-radius: 4px;
            cursor: pointer;
          `}
          onMouseEnter={fromEvent}
          onMouseLeave={() => setCapturing(false)}
          onMouseMove={fromEvent}
          onMouseUp={() => capturing && onSeek(override)}
        />
        <i
          css={css`
            position: absolute;
            left: 0;
            top: calc((100% - 6px) / 2);
            height: 6px;
            width: 100%;
            background: var(--color-gray);
            border-radius: 4px;
            pointer-events: none;
          `}
        />
        <i
          css={css`
            position: absolute;
            left: 0;
            top: calc((100% - 6px) / 2);
            height: 6px;
            background: var(--color-primary1);
            border-radius: 4px;
            pointer-events: none;
          `}
          style={{
            width: `calc(100% * ${displayedValue})`
          }}
        />
      </div>
      {post && <SliderLabel ml>{post}</SliderLabel>}
    </div>
  );
};

export default Slider;
