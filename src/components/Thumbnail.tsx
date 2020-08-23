/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FC } from 'react';

interface Props {
  size: number;
  src: string;
  alt?: string;
  rounded?: boolean;
}

const Thumbnail: FC<Props> = ({ size, src, alt, rounded, ...rest }) => {
  return (
    <img
      src={src}
      alt={alt}
      css={[css`
        display: inline-block;
        overflow: hidden;
        width: ${size}px;
        height: ${size}px;
        object-fit: contain;
        background: var(--nord1);
      `, rounded ? css`
        border-radius: 999999px;
      ` : css`
        border-radius: .5rem;
      `]}
      {...rest}
    />
  );
};

export default Thumbnail;
