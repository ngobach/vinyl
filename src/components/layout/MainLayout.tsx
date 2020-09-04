/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import BlankLayout from './BlankLayout';

interface Props {
    sidebar?: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({
    sidebar,
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
                {children}
            </div>
        </main>
    </BlankLayout>
);

export default MainLayout;
