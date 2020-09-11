/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FCWithTitle } from '../types';
import { sampleSize } from 'lodash';
import { useMedialist } from '~/hooks';
import Section from '~/components/Section';
import TrackComponent, { DisplayMode } from '~/components/Track';
import { useRef } from 'react';
import Spacer from '~/components/Spacer';
import ArtistComponent, { DisplayMode as ArtistDisplayMode } from '~/components/Artist';

const TRACK_SAMPLE_SIZE = 12;
const ARTIST_SAMPLE_SIZE = 8;

const Today: FCWithTitle = () => {
    const ml = useMedialist();
    const tracks = useRef(sampleSize(ml.tracks, TRACK_SAMPLE_SIZE)).current;
    const artists = useRef(sampleSize(ml.artists, ARTIST_SAMPLE_SIZE)).current;

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
                        <TrackComponent key={track.title} track={track} displayMode={DisplayMode.Large} />
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

Today.title = 'Listen And Chill';

export default Today;
