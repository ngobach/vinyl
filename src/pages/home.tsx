/** @jsx jsx */
import React, { useRef } from 'react';
import { useRouteMatch } from 'react-router';
import Helmet from 'react-helmet';
import { css, jsx } from '@emotion/core';
import Playbar from '@/components/Playbar';
import SideBar from '@/components/SideBar';
import MainLayout from '@/components/layout/MainLayout';
import { useMediaController, useMediaList, useMediaEngine } from '@/hooks';

import { FCWithTitle } from './types';
import Welcome from './home/Welcome';
import Building from './home/Building';
import Today from './home/Today';
import Tracks from './home/Tracks';
import { useMount, useUpdate } from 'react-use';

function resolveScreen(
  q: Record<string, string>,
): [FCWithTitle, Record<string, unknown>] {
  // eslint-disable-next-line
  const { l1, l2, l3, l4 } = q;

  if (l1 === 'today') {
    return [Today, { page: 'today' }];
  }

  if (l1 === 'favorites') {
    return [Building, {}];
  }

  if (l1 === 'history') {
    return [Building, {}];
  }

  if (l1 === 'genre') {
    return [Building, {}];
  }

  if (l1 === 'tracks') {
    return [Tracks, {}];
  }

  if (l1 === 'artists') {
    return [Building, {}];
  }

  return [Welcome, {}];
}

const HomePage: React.FC = () => {
  const slotRef = useRef<HTMLDivElement>(null);
  const ml = useMediaList();
  const engine = useMediaEngine();
  const controller = useMediaController();
  const routeParams = useRouteMatch('/:l1?/:l2?/:l3?/:l4?');
  const [Component, params] = resolveScreen(routeParams.params);
  const update = useUpdate();
  useMount(() => requestAnimationFrame(update));
  const content = <Component {...params} slotRef={slotRef} />;

  const player = (
    <div
      css={css`
        padding: 0 1rem;
        position: relative;
      `}
    >
      <div
        css={css`
          background: var(--color-background);
          padding: 0 0.5rem 0.25rem;
          ::before {
            content: '';
            display: block;
            position: absolute;
            top: -10px;
            left: 1rem;
            right: 1rem;
            height: 10px;
            z-index: -1;
            background: linear-gradient(
              to bottom,
              var(--color-background-transparent),
              var(--color-background)
            );
          }
        `}
      >
        {engine.currentTrack && (
          <Playbar
            hasNext={true}
            hasPrev={true}
            mode={engine.mode}
            track={engine.currentTrack}
            status={engine.status}
            volume={engine.volume}
            onModeChanged={(m) => controller.setMode(m)}
            onNext={() => controller.next()}
            onPause={() => controller.pause()}
            onPlay={() => controller.play()}
            onPrev={() => controller.prev()}
            onVolumeChange={(v) => controller.setVolume(v)}
          />
        )}
      </div>
    </div>
  );

  const pageTitle =
    typeof Component.title === 'function'
      ? Component.title(params)
      : typeof Component.title === 'string'
      ? Component.title
      : "I'm feeling happy";
  const documentTitle = engine.currentTrack
    ? `${engine.currentTrack.title} - ${engine.currentTrack.artist}`
    : pageTitle;

  return (
    <MainLayout
      sidebar={<SideBar medialist={ml} slot={<div ref={slotRef} />} />}
      title={pageTitle}
      playerArea={player}
    >
      <Helmet>
        <title>{documentTitle}</title>
      </Helmet>

      {content}
    </MainLayout>
  );
};

export default HomePage;
