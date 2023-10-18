/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import { range } from 'lodash';
import { motion } from 'framer-motion';

type Props = {
  enabled: Record<string, boolean>;
  active: Record<string, boolean>;
  onSelect: (letter: string) => void;
};

const LetterBoard: React.FC<Props> = ({ enabled, active, onSelect }) => (
  <motion.div
    css={css`
      margin-right: 20px;
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-auto-rows: repeat(6, 1fr);
      overflow: hidden;
      gap: 4px;
    `}
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {
        height: 0,
        opacity: 0,
      },
      visible: {
        height: 'auto',
        opacity: 1,
      },
    }}
  >
    {range(26).map((no) => {
      const letter = String.fromCharCode('A'.charCodeAt(0) + no);

      return (
        <div
          key={no}
          css={css`
            font-weight: bold;
            text-align: center;
            padding: 5px 0;
            background: #ffffff08;
            border-radius: 4px;
            color: #888888;

            ${enabled[letter] &&
            css`
              color: #ffffff;
              cursor: pointer;
            `}
            ${active[letter] &&
            css`
              color: var(--color-primary1);
            `}
          `}
          onClick={() => enabled[letter] && onSelect(letter)}
        >
          {letter}
        </div>
      );
    })}
  </motion.div>
);

export default LetterBoard;
