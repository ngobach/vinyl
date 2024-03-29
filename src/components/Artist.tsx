/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FC } from "react";
import { PlayList } from "~/types";
import { DEFAULT_THUMBNAIL } from "~/env";
import Thumbnail from "./Thumbnail";

enum DisplayMode {
  List,
  Vertical,
  Horizontal,
}

interface ArtistProps {
  artist: PlayList;
  mode?: DisplayMode;
  subline?: string;
  tag?: string;
  onClick?: (a: PlayList) => void;
  onTagClick?: (a: PlayList) => void;
}

const ArtistComponent: FC<ArtistProps> = ({
  artist,
  mode = DisplayMode.List,
  subline = null,
  tag = null,
  onClick = null,
  onTagClick,
}) => {
  return mode === DisplayMode.Vertical ? (
    <div
      css={css`
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        cursor: ${onClick ? "pointer" : "initial"};
      `}
    >
      <Thumbnail
        src={artist.coverUrl ?? DEFAULT_THUMBNAIL}
        alt={artist.title}
        size={100}
        rounded
      />
      <h3
        css={css`
          margin-top: 0.5rem;
          font-weight: 600;
        `}
      >
        {artist.title}
      </h3>
      {subline && (
        <span
          css={css`
            display: block;
            margin-top: 0.2rem;
            font-weight: 400;
            font-size: 0.8rem;
            color: var(--nord8);
          `}
        >
          {subline}
        </span>
      )}
    </div>
  ) : mode === DisplayMode.List ? (
    <div
      css={css`
        display: flex;
        align-items: center;
        cursor: ${onClick ? "pointer" : "initial"};
      `}
      onClick={() => onClick && onClick(artist)}
    >
      <Thumbnail
        src={artist.coverUrl ?? DEFAULT_THUMBNAIL}
        alt={artist.title}
        size={32}
        rounded
      />
      <h3
        css={css`
          margin-left: 1em;
          font-weight: 600;
        `}
      >
        {artist.title}
      </h3>
    </div>
  ) : (
    <div
      css={css`
        display: flex;
        align-items: center;
        cursor: ${onClick ? "pointer" : "initial"};
      `}
      onClick={() => onClick && onClick(artist)}
    >
      <Thumbnail
        src={artist.coverUrl ?? DEFAULT_THUMBNAIL}
        alt={artist.title}
        size={80}
      />
      <div
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 1em;
        `}
      >
        {tag && (
          <h4
            css={[
              css`
                font-weight: 600;
                font-size: 0.8rem;
                color: var(--color-primary1);
              `,
              tag &&
                css`
                  cursor: pointer;
                `,
            ]}
            onClick={(e) => {
              if (onTagClick) {
                onTagClick(artist);
              }
              e.stopPropagation();
            }}
          >
            {`#${tag}`}
          </h4>
        )}
        <h3
          css={css`
            font-weight: 600;
          `}
        >
          {artist.title}
        </h3>
        <span
          css={css`
            margin-top: 0.25rem;
            display: block;
            font-weight: 400;
            font-size: 0.8rem;
            color: var(--color-nord8);
          `}
        >
          {subline}
        </span>
      </div>
    </div>
  );
};

export default ArtistComponent;
export { DisplayMode };
