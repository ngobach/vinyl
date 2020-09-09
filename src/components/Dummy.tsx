/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

interface Props {
    title?: string;
}

const Dummy: React.FC<Props> = ({ title }) => (
    <main css={css`
        background: #0002;
        padding: 1rem;
        border-radius: .5rem;
        font-weight: bold;
    `}>
        {title ?? 'Dummy Component'}
    </main>
);

export default Dummy;
