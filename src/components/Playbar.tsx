/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FC, useCallback } from 'react';
import { PlaybackMode } from '~/services/audioengine';
import { Track, PlaybackStatus } from '~/types';
import MQ from '~/utils/mq';
import Thumbnail from './Thumbnail';
import Icon, { Icons } from './Icon';
import Slider from './Slider';

const IconButton = ({ icon, onClick, color = null, active = false, size = null, disabled = false }) => {
  return (
    <Icon
      icon={icon}
      size={size ?? 16}
      css={css`
        cursor: ${!disabled ? 'pointer' : 'inherit'};
        padding: 4px;
        margin: 0 12px;
        ${MQ.Small} {
          padding: 0;
          margin: 0 6px;
        }
        transition: color ease 100ms;
      `}
      color={color ?? (active ? 'var(--color-primary1)'  : disabled ? 'var(--color-gray)' : '')}
      onClick={onClick}
    />
  );
};

const PlayPauseButton = ({ playing, onClick }) => {
  return (
    <IconButton
      size={32}
      icon={playing ? Icons.pause : Icons.play}
      onClick={onClick}
    />
  );
};

const TrackInfo: FC<{ track: Track }> = ({ track, ...rest }) => (
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
  onModeChanged: (m: PlaybackMode) => void;
  onVolumeChange: (f: number) => void;
}

const Playbar: FC<PlaybarProps> = ({
  track,
  status,
  hasPrev,
  hasNext,
  mode,
  volume,
  onPlay,
  onPause,
  onPrev,
  onNext,
  onVolumeChange,
  onModeChanged,
}) => {
  const volumeClicked = useCallback(() => {
    if (volume > 0) {
      onVolumeChange(0);
    } else {
      onVolumeChange(1);
    }
  }, [onVolumeChange, volume]);

  const modeClicked = useCallback((m: PlaybackMode) => {
    if (mode !== m) {
      onModeChanged(m);
    } else {
      onModeChanged(PlaybackMode.RepeatOne);
    }
  }, [mode, onModeChanged]);

  return (
    <div
      css={css`
        height: 60px;
        display: flex;
        flex-direction: row;
      `}
    >

      <TrackInfo
        css={css`
          align-self: center;
          width: 240px;
          overflow: hidden;
          margin-right: 1rem;
          ${MQ.Small} {
            display: none;
          }
        `}
        track={track}
      />
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          align-self: center;
          margin: 0 auto;
          ${MQ.Small} {
            margin-left: 0;
          }
        `}
      >
        <IconButton icon={Icons.previous} onClick={onPrev} disabled={!hasPrev} />
        <IconButton icon={Icons.random} active={mode === PlaybackMode.RepeatAll} onClick={modeClicked.bind(null, PlaybackMode.Shuffled)} />
        <PlayPauseButton playing={status.playing} onClick={status.playing ? onPause : onPlay} />
        <IconButton icon={Icons.loop} active={mode === PlaybackMode.Shuffled} onClick={modeClicked.bind(null, PlaybackMode.RepeatAll)} />
        <IconButton icon={Icons.next} onClick={onNext} disabled={!hasNext} />
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          margin-left: 1rem;
        `}
      >
        <Slider
          css={css`
            width: 200px;
            ${MQ.Small} {
              width: 120px;
            }
          `}
          value={volume}
          onSeek={onVolumeChange}
          pre={(
            <IconButton icon={volume > 0 ? Icons.volume : Icons.volumeOff} onClick={volumeClicked} color="#ffffff" />
          )
        }/>
      </div>
    </div>
  );
};

export default Playbar;
