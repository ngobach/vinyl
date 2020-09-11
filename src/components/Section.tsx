/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { LinkTarget } from '~/types';
import Clickable from './Clickable';
import Text from './Text';

interface Props {
    title?: string;
    target?: LinkTarget;
}

const Section: React.FC<Props> = ({
    title,
    target = {},
    children,
}) => (
    <section>
        {title && (
            <Clickable {...target}>
                <Text size="l" bold inline>{title}</Text>
            </Clickable>
        )}
        <div css={css`
            margin-top: ${title ? '1rem' : '0'};
            border-radius: .25rem;
            padding: 1rem;
            background: #0001;
        `}>
            {children}
        </div>
    </section>
);

export default Section;
