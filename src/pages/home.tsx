/** @jsx jsx */
import React from 'react';
import { useRouteMatch } from 'react-router';
import { css, jsx } from '@emotion/core';
import * as env from '~/env';

import Welcome from './home/Welcome';
import Building from './home/Building';
import Today from './home/Today';

import Logo from '~/components/Logo';
import MainLayout from '~/components/layout/MainLayout';
import Nav from '~/components/Nav';
import NavItem from '~/components/NavItem';
import Block from '~/components/Block';
import { useMedialist } from '~/hooks';
import Clickable from '~/components/Clickable';
import { FCWithTitle } from './types';
import Spacer from '~/components/Spacer';

function resolveScreen<P>(q: Record<string, string>): [FCWithTitle<P>, Record<string, unknown>] {
    const {l1, l2, l3, l4} = q;

    if (l1 === 'today') {
        return [Today, { page: 'today' }];
    }

    if (l1 === 'favorites') {
        return [Building, { page: 'favorites' }];
    }

    if (l1 === 'history') {
        return [Building, {}];
    }

    if (l1 === 'genre') {
        return [Building, {}];
    }

    return [Welcome, {}];
}

const HomePage: React.FC = () => {
    const ml = useMedialist();
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
                    <NavItem iconName="heart" text="Favorites" target={{}} />
                    <NavItem iconName="history" text="History" target={{}} />
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
