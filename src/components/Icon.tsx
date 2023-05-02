/** @jsx jsx */
import { jsx, css } from "@emotion/core";

export enum Icons {
  play = "play",
  pause = "pause",
  random = "random",
  loop = "loop",
  previous = "previous",
  next = "next",
  volume = "volume",
  volumeOff = "volume-off",
}

interface IconProps {
  icon: Icons;
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({
  icon,
  size = 32,
  color = "#ffffff",
  className,
  onClick,
  ...rest
}) => (
  <span
    className={`im im-fix im-${icon} ${className ?? ""}`}
    css={css`
      line-height: 1;
      font-size: ${size}px;
      color: ${color};
    `}
    onClick={onClick}
    {...rest}
  />
);

export default Icon;
