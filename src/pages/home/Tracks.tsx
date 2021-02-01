/** @jsx jsx */
import { useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { jsx, css } from '@emotion/core';
import { groupBy } from 'lodash';
import TVKD from 'tieng-viet-khong-dau';
import { useMediaController, useMediaList } from '~/hooks';
import { Track } from '~/types';
import Section from '~/components/Section';
import TrackComponent, { DisplayMode } from '~/components/Track';
import ImgResting from '~/assets/img/undraw_chilling_8tii.svg';
import { FCWithTitle } from '../types';
import LetterBoard from '~/components/LetterBoard';
import { useEffectOnce } from 'react-use';

type TrackGroup = {
  name: string;
  tracks: Track[];
};

const Tracks: FCWithTitle = ({ slotRef }) => {
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
  const letters = groups.map(({ name }) => name).reduce((obj, letter) => ({ ...obj, [letter]: true }), {});
  const [activeLetters, setActiveLetters] = useState<Record<string, boolean>>({});
  const scrollToLetter = (letter: string) => {
    const el = document.querySelector(`[data-letter=${letter}]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('Selector not match');
    }
  };
  useEffectOnce(() => {
    const elements = document.querySelectorAll('[data-letter]');
    const cb: IntersectionObserverCallback = (entries) => {
      console.log('Hit');
      setActiveLetters((current) => {
        const cloned = { ...current };
        entries.forEach((entry) => {
          const letter = entry.target.getAttribute('data-letter');
          if (entry.isIntersecting) {
            cloned[letter] = true;
          } else {
            delete cloned[letter];
          }
        });

        return cloned;
      });
    };

    const observer = new IntersectionObserver(cb);
    Array.from(elements).map((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  });

  return (
    <main>
      {groups.map(({ name, tracks }) => (
        <div
          key={name}
          css={css`
            & + & {
              margin-top: 10px;
            }
          `}
          data-letter={name}
        >
          <Section>
            {tracks.map((t, idx) => (
              <div
                key={String(idx)}
                css={css`
                  & + & {
                    margin-top: 10px;
                  }
                `}
              >
                <TrackComponent
                  track={t}
                  displayMode={DisplayMode.Wide}
                  onClick={() => play(t)}
                />
              </div>
            ))}
          </Section>
        </div>
      ))}

      <section
        css={css`
          margin-top: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <img
          src={ImgResting}
          css={css`
            width: 400px;
            height: auto;
          `}
        />
        <p
          css={css`
            margin-top: 40px;
            text-align: center;
            font-size: 1.3rem;
            color: var(--nord4);
          `}
        >
          That is all. Let&apos;s chill!
        </p>
      </section>

      {slotRef.current && ReactDOM.createPortal((
        <div css={css`
          margin-bottom: 20px;
        `}>
          <LetterBoard active={activeLetters} enabled={letters} onSelect={scrollToLetter} />
        </div>
      ), slotRef.current)}
    </main>
  );
};

Tracks.title = 'Your tracks';

export default Tracks;
