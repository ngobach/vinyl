/** @jsx jsx */
import { useMemo, useRef } from 'react';
import { sampleSize } from 'lodash';
import { jsx, css } from '@emotion/core';
import fnv from 'fnv-plus';
import { useMediaController, useMediaList } from '~/hooks';
import Section from '~/components/Section';
import TrackComponent, { DisplayMode } from '~/components/Track';
import Spacer from '~/components/Spacer';
import ArtistComponent, { DisplayMode as ArtistDisplayMode } from '~/components/Artist';
import { PlayList, Track } from '~/types';
import { FCWithTitle } from '../types';

const TRACK_SAMPLE_SIZE = 24;
const ARTIST_SAMPLE_SIZE = 8;
const title = 'Listen And Chill';

function getDatePrefix(): string {
    const d = new Date();
    return `${d.getDate()}${d.getMonth()}${d.getFullYear()}`;
}

const Today: FCWithTitle = () => {
    const ml = useMediaList();
    const controller = useMediaController();
    const datePrefix = useMemo(getDatePrefix, []);
    const tracks = useMemo(() => {
        const tmp = Array.from(ml.tracks);
        tmp.sort((lhs, rhs) => {
            return Math.sign(fnv.fast1a32(datePrefix + lhs.title) - fnv.fast1a32(datePrefix + rhs.title));
        });
        return tmp.slice(0, TRACK_SAMPLE_SIZE);
    }, [datePrefix]);
    const artists = useMemo(() => {
        const tmp = Array.from(ml.artists);
        tmp.sort((lhs, rhs) => {
            return Math.sign(fnv.fast1a32(datePrefix + lhs.title) - fnv.fast1a32(datePrefix + rhs.title));
        });
        return tmp.slice(0, ARTIST_SAMPLE_SIZE);
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
