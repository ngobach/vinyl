/** @jsx jsx */
import React from 'react';
import { useRouteMatch } from 'react-router';
import Helmet from 'react-helmet';
import { css, jsx } from '@emotion/core';
import * as env from '~/env';

import Welcome from './home/Welcome';
import Building from './home/Building';
import Today from './home/Today';
import Tracks from './home/Tracks';

import Logo from '~/components/Logo';
import MainLayout from '~/components/layout/MainLayout';
import Nav from '~/components/Nav';
import NavItem from '~/components/NavItem';
import Block from '~/components/Block';
import { useMediaController, useMediaList, useMediaEngine } from '~/hooks';
import Clickable from '~/components/Clickable';
import { FCWithTitle } from './types';
import Spacer from '~/components/Spacer';
import Playbar from '~/components/Playbar';
import { PlaybackMode } from '~/services/audioengine';

function resolveScreen<P>(q: Record<string, string>): [FCWithTitle<P>, Record<string, unknown>] {
    // eslint-disable-next-line
    const {l1, l2, l3, l4} = q;

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
    const ml = useMediaList();
    const engine = useMediaEngine();
    const controller = useMediaController();
    const routeParams = useRouteMatch('/:l1?/:l2?/:l3?/:l4?');
    const [Component, params] = resolveScreen(routeParams.params);

    const sidebar = (
        <div css={css`
            position: sticky;
            top: 0;
            padding-bottom: 1rem;
        `}>
            <div css={css`
                display: flex;
                justify-content: center;
                padding: 0 0 2rem;
            `}>
                <Clickable href="/">
                    <Logo size={120} />
                </Clickable>
            </div>
            <Block title="Playlists">
                <Nav>
                    <NavItem iconName="care-right" text="Today Mood" target={{ href: '/today' }} />
                    <NavItem iconName="heart" text="Favorites" target={{ href: '/favorites' }} />
                    <NavItem iconName="history" text="History" target={{ href: '/history' }} />
                    <NavItem iconName="layer" text="All Tracks" target={{ href: '/tracks' }} />
                    <NavItem iconName="coffee" text="Artists" target={{ href: '/artists' }} />
                </Nav>
            </Block>
            <Spacer size="2rem" />

            <Block title="Genres">
                {ml.genres.map((g) => (
                    <NavItem key={g.title} iconName="audio" text={g.title} target={{ href: `/genre/${g.title}` }} />
                ))}
            </Block>
            <Spacer size="2rem" />

            <Block title="Vinyl">
                <div css={css`
                    font-family: var(--font-mono);
                    font-size: 75%;
                    color: var(--color-gray);
                `}>
                    <dl>
                        <dt css={css`font-weight: bold;`}>
                            Build target
                        </dt>
                        <dd>
                            {env.DEV ? 'dev' : 'prod'}
                        </dd>
                        <dt css={css`font-weight: bold;`}>
                            Revision
                        </dt>
                        <dd>
                            {env.REVISION}
                        </dd>
                        <dt css={css`font-weight: bold;`}>
                            DB
                        </dt>
                        <dd>
                            <a href={env.MEDIA_SOURCE} css={css`text-decoration: none; color: inherit;`}>Link</a>
                        </dd>
                    </dl>
                </div>
            </Block>
        </div>
    );

    const content = (
        <Component {...params} />
    );

    const player = (
        <div css={css`
            padding: 0 1rem;
            position: relative;
        `}>
            <div css={css`
                background: var(--color-background);
                padding: 0 .5rem .25rem;
                ::before {
                    content: '';
                    display: block;
                    position: absolute;
                    top: -10px;
                    left: 1rem;
                    right: 1rem;
                    height: 10px;
                    z-index: -1;
                    background: linear-gradient(to bottom, var(--color-background-transparent), var(--color-background));
                }
            `}>
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
            : 'I\'m feeling happy';
    const documentTitle = (engine.currentTrack && `${engine.currentTrack.title} - ${engine.currentTrack.artists.map(a => a.title).join(', ')}`) ?? pageTitle;

    return (
        <MainLayout
            sidebar={sidebar}
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
