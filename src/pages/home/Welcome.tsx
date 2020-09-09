/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import Dummy from '~/components/Dummy';
import Text from '~/components/Text';
import Spacer from '~/components/Spacer';

const Welcome: React.FC = () => (
    <main>
        <Spacer size="2rem" />
        <Text size="xl" bold align="right">Howdy...</Text>

        <Spacer size="2rem" />
        <Dummy />
    </main>
);

export default Welcome;
