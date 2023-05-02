/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import { LinkTarget } from "~/types";
import { Link } from "react-router-dom";

type Props = LinkTarget & {
  box?: "inline-block" | "block";
};

const Clickable: React.FC<Props> = ({
  box = "inline-block",
  href,
  onClick,
  children,
}) => {
  return href ? (
    <Link
      to={href}
      css={css`
        text-decoration: none;
      `}
    >
      {children}
    </Link>
  ) : onClick ? (
    <div
      css={
        box === "inline-block"
          ? css`
              display: inline-block;
              cursor: ${onClick ? "pointer" : "default"};
            `
          : null
      }
      onClick={onClick}
    >
      {children}
    </div>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
};

export default Clickable;
