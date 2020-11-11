/** @jsx jsx */
import { useRef } from 'react';
import { sampleSize } from 'lodash';
import { jsx, css } from '@emotion/core';
import { useMediaController, useMediaList } from '~/hooks';
import Section from '~/components/Section';
import TrackComponent, { DisplayMode } from '~/components/Track';
import Spacer from '~/components/Spacer';
import ArtistComponent, { DisplayMode as ArtistDisplayMode } from '~/components/Artist';
import { FCWithTitle } from '../types';
import { PlayList, Track } from '~/types';

const TRACK_SAMPLE_SIZE = 12;
const ARTIST_SAMPLE_SIZE = 8;

const title = 'Listen And Chill';

const Today: FCWithTitle = () => {
    const ml = useMediaList();
    const controller = useMediaController();
    const tracks = useRef(sampleSize(ml.tracks, TRACK_SAMPLE_SIZE)).current;
    const artists = useRef(sampleSize(ml.artists, ARTIST_SAMPLE_SIZE)).current;
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
                <div css={css`
                    display: grid;
                    grid-template-columns: repeat(auto-fill, 180px);
                    justify-content: space-evenly;
                    column-gap: .5rem;
                    row-gap: 1.5rem;
                `}>
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
            <Spacer size="2rem" />

            <Section title="Or artists" target={{ href: '/artists' }}>
                <div css={css`
                    display: grid;
                    grid-template-columns: repeat(auto-fill, 240px);
                    justify-content: space-evenly;
                    column-gap: .5rem;
                    row-gap: 1.5rem;
                `}>
                    {artists.map((artist, idx) => (
                        <ArtistComponent key={idx} artist={artist} subline={`${artist.tracks.length} tracks`} mode={ArtistDisplayMode.Horizontal} />
                    ))}
                </div>
            </Section>
        </section>
    );
};

Today.title = title;

export default Today;
