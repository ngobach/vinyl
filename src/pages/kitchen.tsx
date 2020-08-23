/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment, FC, useState } from 'react';
import Helmet from 'react-helmet';

import log from '~/utils/log';
import Logo from '~/components/Logo';
import Nav from '~/components/Nav';
import NavItem from '~/components/NavItem';
import Block, { Color } from '~/components/Block';
import Artist, { DisplayMode as ArtistDM } from '~/components/Artist';
import Track, { DisplayMode as TrackDM } from '~/components/Track';
import Playbar from '~/components/Playbar';
import Slider from '~/components/Slider';
import { Track as TrackClass, Artist as ArtistClass } from '~/types';
import { PlaybackMode } from '~/services/audioengine';

const fixtures: {
  artist: ArtistClass,
  track: TrackClass,
} = {
  artist: (() => {
    const a = new ArtistClass('Random artist');
    a.cover = 'https://i.pravatar.cc/300?u=toby@cover.com';
    return a;
  })(),
  track: (() => {
    const t = new TrackClass();
    t.title = 'Something just like this';
    t.cover = 'https://i.pravatar.cc/300?u=random@cover.com';
    t.artists = [new ArtistClass('Ngo'), new ArtistClass('Bach')];
    return t;
  })(),
};

const Example: FC<{ title: string }> = ({ title, children }) => (
  <section
    css={css`
      margin-bottom: 2rem;
      &:last-of-type {
        margin-bottom: auto;
      }
    `}
  >
    <h2
      css={css`
        font-weight: 900;
        font-size: .8rem;
        line-height: 2;
        color: var(--color-gray);
      `
    }>
      { title }
    </h2>
    <div css={css`
      border-top: solid 1px var(--nord1);
      border-bottom: solid 1px var(--nord1);
      padding-top: .2rem;
      padding-bottom: .2rem;
      overflow: hidden;
    `}>
      { children }
    </div>
  </section>
);

const Spacer: FC<{}> = () => (
  <div
    css={css`
      height: 1rem;
    `}
  />
);


const ExamplePlaybar: FC<{}> = () => {
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(.2);

  return (
    <Playbar
      hasNext
      mode={PlaybackMode.Shuffled}
      status={{ duration: 300, played: 100, playing }}
      track={fixtures.track}
      volume={volume}
      hasPrev={true}
      onModeChanged={() => 0}
      onPrev={() => 0}
      onNext={() => 0}
      onVolumeChange={setVolume}
      onPause={() => setPlaying(false)}
      onPlay={() => setPlaying(true)}
    />
  );
};

const ExampleSlider = () => {
  const [v, setV] = useState(.5);
  return (
    <Slider value={v} onSeek={setV} pre={(
      <span>Ahihi</span>
    )} post={(
      <span>Do Ngoc</span>
    )}/>
  );
};

const KitchenPage: FC<{}> = () => (
  <Fragment>
    <Helmet>
      <title>Kitchen sink</title>
    </Helmet>
    <main css={css`
      margin: 2rem auto;
      max-width: 1024px;
      padding: 0 2rem;
    `}>
      <h1 css={css`
        font-size: 2rem;
        font-weight: bold;
        margin-top: 3rem;
        margin-bottom: 3rem;
      `}>
        Kitchen sink
      </h1>

      <Example title="Logo">
        <Logo />
      </Example>

      <Example title="NavList">
        <div css={css`
          width: 200px;
        `}>
          <Nav>
            <NavItem iconName="radar" text="Radar" />
            <NavItem iconName="flash" text="Flash" />
          </Nav>
        </div>
      </Example>

      <Example title="Block">
        <Block title="Most loved songs" color={Color.White}>
          Any content can go here
        </Block>
      </Example>

      <Example title="Artist">
        <div css={css`width: 280px;`}>
          <Artist mode={ArtistDM.List} artist={fixtures.artist} onClick={(a) => log(a)} />
          <Spacer />
          <Artist mode={ArtistDM.Vertical} artist={fixtures.artist} onClick={(a) => log(a)} subline='See? It is easy'/>
          <Spacer />
          <Artist mode={ArtistDM.Horizontal} artist={fixtures.artist} onClick={(a) => log(a)} subline='See? It is easy' tag='No 1' />
        </div>
      </Example>

      <Example title="Track">
        <div css={css`
          width: 400px;
        `}>
          <Track displayMode={TrackDM.Normal} track={fixtures.track} />
          <Track displayMode={TrackDM.Wide} track={fixtures.track} />
          <Track displayMode={TrackDM.Large} track={fixtures.track} />
        </div>
      </Example>

      <Example title="Slider">
        <ExampleSlider />
      </Example>

      <Example title="Playbar">
        <ExamplePlaybar />
      </Example>
    </main>
  </Fragment>
);

export default KitchenPage;
