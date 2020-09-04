/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import * as env from '~/env';
import Logo from '~/components/Logo';
import MainLayout from '~/components/layout/MainLayout';
import Nav from '~/components/Nav';
import NavItem from '~/components/NavItem';
import Block from '~/components/Block';
import { useMedialist } from '~/hooks';
import Clickable from '~/components/Clickable';

const HomePage: React.FC = () => {
    const ml = useMedialist();

    const sidebar = (
        <div css={css`
            position: sticky;
            top: 0;
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
                    <NavItem iconName="care-right" text="Today Mood" target={{ href: '/?playlist=today' }} />
                    <NavItem iconName="heart" text="Favorites" target={{}} />
                    <NavItem iconName="history" text="History" target={{}} />
                </Nav>
            </Block>
            <div css={css`height: 2rem;`} />

            <Block title="Genres">
                {ml.genres.map((g) => (
                    <NavItem iconName="audio" text={g.title} target={{ href: `/?playlist=genre&genre=${g.title}` }} />
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
        <main>
            The content
        </main>
    );

    return (
        <MainLayout sidebar={sidebar}>
        {content}
      </MainLayout>
    );
};

export default HomePage;
