/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import BlankLayout from './BlankLayout';

interface Props {
    sidebar?: React.ReactNode;
    title?: string;
}

const MainLayout: React.FC<Props> = ({
    sidebar,
    title,
    children,
}) => (
    <BlankLayout>
        <main css={css`
            display: flex;
            width: 100%;
            min-height: 100%;
            @media (min-height: 800px) {
                padding: 2rem 0;
            }
        `}>
            <div css={css`
                width: 200px;
            `}>
                {sidebar}
            </div>
            <div css={css`
                flex: 1;
                overflow: hidden;
            `}>
                <div css={css`
                    display: flex;
                    height: 150px;
                    padding: 0 0 .8rem;
                    justify-content: center;
                    align-items: flex-end;
                    font-size: 2rem;
                    font-weight: bold;
                `}>
                    {title}
                </div>
                {children}
            </div>
        </main>
    </BlankLayout>
);

export default MainLayout;
