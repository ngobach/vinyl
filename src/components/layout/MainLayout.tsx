/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import BlankLayout from './BlankLayout';

interface Props {
    sidebar?: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({
    sidebar,
}) => (
    <BlankLayout>
        <main css={css`
            display: flex;
            width: 100%;
            height: 100%;
            background: #ff000080;
        `}>
            <div css={css`
                width: 280px;
            `}>
                WOW
            </div>
        </main>
    </BlankLayout>
);

export default MainLayout;
