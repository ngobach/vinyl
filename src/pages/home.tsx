/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import Logo from '~/components/Logo';
import MainLayout from '~/components/layout/MainLayout';
import Nav from '~/components/Nav';
import NavItem from '~/components/NavItem';
import Block from '~/components/Block';
import { useMedialist } from '~/hooks';
import Clickable from '~/components/Clickable';

const HomePage: React.FC = () => {
    const ml = useMedialist();

    return (
        <MainLayout sidebar={(
            <div css={css`
                position: sticky;
                top: 0;
            `}>
                <div css={css`
                    display: flex;
                    justify-content: center;
                `}>
                    <Clickable href="/">
                        <Logo size={120} />
                    </Clickable>
                </div>
                <Block title="Playlists">
                    <Nav>
                        <NavItem iconName="care-right" text="Today Mood" target={{ href: '/?playlist=today' }} />
                        <NavItem iconName="heart" text="Favorites" target={{ href: '/?playlist=favorites' }} />
                    </Nav>
                </Block>
                <Block title="Genres">
                    {ml.genres.map((g) => (
                        <NavItem iconName="audio" text={g.title} target={{ href: `/?playlist=genre&genre=${g.title}` }} />
                    ))}
                </Block>
            </div>
        )}>
        <main>
            The content
        </main>
      </MainLayout>
    );
}

export default HomePage;
