/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import { DEFAULT_THUMBNAIL } from "~/env";
import { Track } from "~/types";
import Thumbnail from "./Thumbnail";

interface TrackProps {
  track: Track;
  displayMode?: DisplayMode;
  onClick?: (t: Track) => void;
}

enum DisplayMode {
  Normal,
  Wide,
  Large,
}

const TrackComponent: React.FC<TrackProps> = ({
  track,
  displayMode = DisplayMode.Normal,
  onClick,
}) => {
  return (
    <div
      css={[
        css`
          display: flex;
          align-items: center;
          cursor: pointer;
        `,
        displayMode === DisplayMode.Large &&
          css`
            display: inline-flex;
            flex-direction: column;
          `,
      ]}
      onClick={() => onClick?.(track)}
    >
      <Thumbnail
        src={track.coverUrl ?? DEFAULT_THUMBNAIL}
        size={displayMode === DisplayMode.Large ? 160 : 40}
      />
      <div
        css={[
          displayMode !== DisplayMode.Large
            ? css`
                flex: 1;
                margin-left: 2rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
              `
            : css`
                width: 160px;
                margin-top: 0.5rem;
              `,
        ]}
      >
        <h3
          css={css`
            font-size: 0.8rem;
            ${displayMode === DisplayMode.Wide &&
            css`
              font-size: 1rem;
              font-weight: bold;
            `}
          `}
        >
          {track.title}
        </h3>
        {displayMode !== DisplayMode.Normal && track.artist && (
          <h4
            css={css`
              font-size: 0.8rem;
              font-weight: 600;
              color: var(--nord9);
            `}
          >
            {track.artist}
          </h4>
        )}
      </div>
    </div>
  );
};

export default TrackComponent;
export { DisplayMode };
