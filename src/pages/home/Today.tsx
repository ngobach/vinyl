/** @jsx jsx */
import { useMemo } from 'react';
import { jsx, css } from '@emotion/core';
import fnv from 'fnv-plus';
import { useMediaController, useMediaList } from '@/hooks';
import Section from '@/components/Section';
import TrackComponent, { DisplayMode } from '@/components/Track';
import { PlayList, Track } from '@/types';
import { FCWithTitle } from '../types';

const TRACK_SAMPLE_SIZE = 24;
const title = 'Listen And Chill';

const Today: FCWithTitle = () => {
  const ml = useMediaList();
  const controller = useMediaController();
  const datePrefix = useMemo(() => {
    const d = new Date();
    return `${d.getDate()}${d.getMonth()}${d.getFullYear()}`;
  }, []);

  const tracks = useMemo(() => {
    const cloned = Array.from(ml.tracks);
    cloned.sort((lhs, rhs) =>
      Math.sign(
        fnv.fast1a32(datePrefix + lhs.title) -
          fnv.fast1a32(datePrefix + rhs.title),
      ),
    );

    return cloned.slice(0, TRACK_SAMPLE_SIZE);
  }, [datePrefix]);

  const playlist: PlayList = {
    title,
    coverUrl: null,
    tracks,
  };

  const playItem = (t: Track) => {
    controller.playPlayList(playlist, t);
  };

  return (
    <section>
      <Section title="Some tracks" target={{ href: '/tracks' }}>
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(auto-fill, 180px);
            justify-content: space-evenly;
            column-gap: 0.5rem;
            row-gap: 1.5rem;
          `}
        >
          {tracks.map((track) => (
            <TrackComponent
              key={track.title}
              track={track}
              displayMode={DisplayMode.Large}
              onClick={() => playItem(track)}
            />
          ))}
        </div>
      </Section>
    </section>
  );
};

Today.title = title;

export default Today;
