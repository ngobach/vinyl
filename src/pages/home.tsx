/** @jsx jsx */
import React from 'react';
import { useRouteMatch } from 'react-router';
import { css, jsx } from '@emotion/core';
import * as env from '~/env';

import Welcome from './home/Welcome';

import Logo from '~/components/Logo';
import MainLayout from '~/components/layout/MainLayout';
import Nav from '~/components/Nav';
import NavItem from '~/components/NavItem';
import Block from '~/components/Block';
import { useMedialist } from '~/hooks';
import Clickable from '~/components/Clickable';
import { FCWithTitle } from './types';

function resolveScreen<P>(q: Record<string, string>): [FCWithTitle<P>, Record<string, unknown>] {
    const playlist = q.p;
    const genre = q.g;

    return [Welcome, {}];
}

const HomePage: React.FC = () => {
    const ml = useMedialist();
    const route = useRouteMatch();
    const [Component, params] = resolveScreen(route.params);

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
                    <NavItem iconName="care-right" text="Today Mood" target={{ href: '/?p=today' }} />
                    <NavItem iconName="heart" text="Favorites" target={{}} />
                    <NavItem iconName="history" text="History" target={{}} />
                </Nav>
            </Block>
            <div css={css`height: 2rem;`} />

            <Block title="Genres">
                {ml.genres.map((g) => (
                    <NavItem key={g.title} iconName="audio" text={g.title} target={{ href: `/?g=${g.title}` }} />
                ))}
            </Block>
            <div css={css`height: 2rem;`} />

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

    return (
        <MainLayout
            sidebar={sidebar}
            title={Component.title ?? 'I\'m feeling happy'}
        >
            {content}
        </MainLayout>
    );
};

export default HomePage;
