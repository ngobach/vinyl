/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { FCWithTitle } from '../types';
import Text from '~/components/Text';

const Building: FCWithTitle = ({}) => (
    <Text size="xl">
        Under construction
    </Text>
);

Building.title = '';

export default Building;
