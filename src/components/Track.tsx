/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FunctionComponent } from 'react';
import { Track } from '~/services/common';
import Thumbnail from './Thumbnail';

interface TrackProps {
  track: Track;
  displayMode?: DisplayMode;
  onClick?: (t: Track) => any;
}

enum DisplayMode {
  Normal,
  Wide,
  Large,
}

const TrackComponent: FunctionComponent<TrackProps> = ({ track, displayMode = DisplayMode.Normal, onClick }) => {
  const artists = track.artists.map(a => a.title).join('; ');
  return (
    <div
      css={[css`
        display: flex;
        align-items: center;
        cursor: pointer;
      `, displayMode === DisplayMode.Large && css`
        display: inline-flex;
        flex-direction: column;
      `]}
      onClick={() => onClick && onClick(track)}
    >
      <Thumbnail src={track.cover} size={displayMode === DisplayMode.Large ? 160 : 32} rounded={displayMode !== DisplayMode.Large} />
      <div
        css={[displayMode !== DisplayMode.Large ? css`
          flex: 1;
          margin-left: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        ` : css`
          width: 160px;
          margin-top: .5rem;
        `]}
      >
        <h3
          css={css`
            font-size: .8rem;
            font-weight: 600;
          `}
        >
          { track.title }
        </h3>
        {displayMode !==  DisplayMode.Normal && artists && (
          <h4
            css={css`
              font-size: .8rem;
              font-weight: 600;
              color: var(--nord9);
            `}
          >
            { artists }
          </h4>
        )}
      </div>
    </div>
  );
};

export default TrackComponent;
export { DisplayMode };