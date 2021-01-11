/** @jsx jsx */
import { useMemo } from 'react';
import { jsx, css } from '@emotion/core';
import { groupBy } from 'lodash';
import TVKD from 'tieng-viet-khong-dau';
import { useMediaController, useMediaList } from '~/hooks';
import { Track } from '~/types';
import Section from '~/components/Section';
import Spacer from '~/components/Spacer';
import { FCWithTitle } from '../types';

type TrackGroup = {
  name: string;
  tracks: Track[];
};

const Tracks: FCWithTitle = () => {
  const ml = useMediaList();
  const mediaController = useMediaController();
  const groups = useMemo<TrackGroup[]>(() => {
    const sorted = [...ml.tracks].sort((l, r) => l.title.localeCompare(r.title));
    const grouped = groupBy(sorted, (t) => {
      const letter = TVKD.c(t.title.toLocaleUpperCase()[0]);
      return letter.match(/[A-Z]/) ? letter : '#';
    });

    return Object.entries(grouped).map(([k, v]) => ({
      name: k,
      tracks: v,
    }));
  }, []);
  const play = (t: Track) => {
    mediaController.playPlayList(ml.all, t);
  };

  return (
    <main>
      {groups.map(({ name, tracks }) => (
        <div key={name}>
          <Section title={name}>
            {tracks.map((t) => (
              <div
                key={t.title}
                css={css`
                  padding: .5rem 0;
                  cursor: pointer;
                  & + & {
                    margin-top: 5px;
                  }
                `}
                onClick={() => play(t)}
              >
                <span
                  css={css`
                    font-weight: bold;
                    color: var(--nord5);
                  `}
                >
                  {t.title}
                </span>
                {' - '}
                <span
                  css={css`
                    font-weight: bold;
                    font-size: .8rem;
                    color: var(--color-primary2);
                  `}
                >
                  {t.artists.map(a => a.title).join(', ')}
                </span>
              </div>
            ))}
          </Section>
          <Spacer size="20px" />
        </div>
      ))}
    </main>
  );
};

Tracks.title = 'Your tracks';

export default Tracks;
