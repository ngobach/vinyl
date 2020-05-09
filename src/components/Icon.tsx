/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FunctionComponent, useCallback } from 'react';

export enum Icons {
  play = 'play',
  pause = 'pause',
  random = 'random',
  loop = 'loop',
  previous = 'previous',
  next = 'next',
  volume = 'volume',
  volumeOff = 'volume-off',
}

interface IconProps {
  icon: Icons;
  size?: number;
  color?: string;
  className?: any;
  onClick?: () => any;
}

const Icon: FunctionComponent<IconProps> = ({ icon, size = 32, color = '#ffffff', className, onClick, ...rest }) => {
  const clickCallback = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  return (
    <span className={`im im-fix im-${icon} ${className ?? ''}`} css={css`line-height: 1; font-size: ${size}px; color: ${color};`} onClick={clickCallback} {...rest} />
  );
};

export default Icon;
