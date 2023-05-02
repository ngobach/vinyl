/** @jsx jsx */
import React, { useCallback, useRef, useState } from "react";
import { css, jsx } from "@emotion/core";
import { clamp } from "lodash";

const SliderLabel: React.FC<{ mr?: boolean; ml?: boolean }> = ({
  children,
  ml,
  mr,
}) => (
  <div
    css={[
      css`
        color: var(--color-gray);
        font-size: 0.8rem;
      `,
      mr &&
        css`
          margin-right: 0.5em;
        `,
      ml &&
        css`
          margin-left: 0.5em;
        `,
    ]}
  >
    {children}
  </div>
);

interface SliderProps {
  value: number;
  pre?: React.ReactNode;
  post?: React.ReactNode;
  live?: boolean;
  onSeek: (newValue: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  value,
  pre,
  post,
  live = false,
  onSeek,
  ...rest
}) => {
  const [override, setOverride] = useState<number | null>(null);
  const displayedValue = override ?? value;
  const holder = useRef<HTMLDivElement>(null);

  const pointerDownHandler = useCallback((e: React.PointerEvent) => {
    holder.current.setPointerCapture(e.pointerId);
    const clientRect = holder.current.getBoundingClientRect();
    const v = (e.pageX - clientRect.left) / clientRect.width;
    setOverride(v);
  }, []);
  const pointerMoveHandler = useCallback(
    (e: React.PointerEvent) => {
      if (typeof override !== "number") {
        return;
      }
      const clientRect = holder.current.getBoundingClientRect();
      const v = clamp((e.pageX - clientRect.left) / clientRect.width, 0, 1);
      setOverride(v);
      if (live) {
        onSeek(v);
      }
    },
    [override, live]
  );
  const pointerUpHandler = useCallback(
    (e: React.PointerEvent) => {
      holder.current.releasePointerCapture(e.pointerId);
      onSeek(override);
      setOverride(null);
    },
    [override]
  );

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
          onPointerDown={pointerDownHandler}
          onPointerMove={pointerMoveHandler}
          onPointerUp={pointerUpHandler}
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
            width: `calc(100% * ${displayedValue})`,
          }}
        />
      </div>
      {post && <SliderLabel ml>{post}</SliderLabel>}
    </div>
  );
};

export default Slider;
