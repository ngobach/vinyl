/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

interface Props {
  size: string;
}

const Spacer: React.FC<Props> = ({ size }) => (
  <div
    css={css`
      height: ${size};
    `}
  />
);

export default Spacer;
