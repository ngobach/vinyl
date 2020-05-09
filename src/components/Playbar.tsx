/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FunctionComponent, useCallback } from 'react';
import { PlaybackMode } from '~/services/audioengine';
import { Track, PlaybackStatus } from '~/services/common';
import MQ from '~/utils/mq';
import Thumbnail from './Thumbnail';
import Icon, { Icons } from './Icon';

const IconButton = ({ icon, onClick }) => {
  return (
    <Icon
      icon={icon}
      size={24}
      css={css`
        cursor: pointer;
        padding: 4px;
        margin: 0 4px;
        ${MQ.Small} {
          padding: 0;
          margin: 0 2px;
        }
      `}
      onClick={onClick}
    />
  );
};

const PlayPauseButton = ({ playing, onClick }) => {
  return (
    <IconButton
      icon={playing ? Icons.pause : Icons.play}
      onClick={onClick}
    />
  );
};

const TrackInfo: FunctionComponent<{ track: Track }> = ({ track, ...rest }) => (
  <div
    css={css`
      display: flex;
      flex-direction: row;
    `}
    {...rest}
  >
    <Thumbnail size={48} src={track.cover} css={css`flex: none;`} />
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-self: center;
        margin-left: 1rem;
        overflow: hidden;
      `}
    >
      <span
        css={css`
          color: var(--color-primary1);
          font-size: .8rem;
          font-weight: bold;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        `}
      >
        { track.title }
      </span>
      <span
        css={css`
          color: var(--nord7);
          font-size: .7rem;;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        `}
      >
        { track.artists.map(a => a.title).join(', ') }
      </span>
    </div>
  </div>
);

interface PlaybarProps {
  track: Track;
  hasPrev: boolean;
  hasNext: boolean;
  mode: PlaybackMode;
  status: PlaybackStatus;
  volume: number;
  onPrev: () => void;
  onNext: () => void;
  onPause: () => void;
  onPlay: () => void;
  onSeek: (f: number) => void;
  onVolumeChange: (f: number) => void;
}

const Playbar: FunctionComponent<PlaybarProps> = ({
  track,
  status,
  onPlay,
  onPause,
}) => {
  return (
    <div
      css={css`
        height: 100px;
        display: flex;
        flex-direction: row;
      `}
    >

      <TrackInfo
        css={css`
          align-self: center;
          width: 240px;
          overflow: hidden;
          margin-right: 4rem;
          ${MQ.Small} {
            display: none;
          }
        `}
        track={track}
      />
      <div
        css={css`
          flex: 1;
          display: flex;
          flex-direction: row;
          align-self: center;
        `}
      >
        <div>
          <PlayPauseButton playing={status.playing} onClick={status.playing ? onPause : onPlay} />
          <IconButton icon={Icons.volume} onClick={() => 0} />
          <IconButton icon={Icons.volumeOff} onClick={() => 0} />
        </div>
      </div>
    </div>
  );
};

export default Playbar;
