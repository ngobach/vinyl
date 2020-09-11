/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FCWithTitle } from '../types';
import Text from '~/components/Text';

const Building: FCWithTitle = (props) => (
    <div>
        <Text size="xl">
            Under construction
        </Text>
        <div css={css`
            white-space: pre-wrap;
            font-family: 'Courier New', Courier, monospace;
            padding: 1rem;
            border: solid 1px var(--color-gray);
            border-radius: .25rem;
            margin-top: 2rem;
        `}>
            {JSON.stringify(props)}
        </div>
    </div>
);

Building.title = '';

export default Building;
