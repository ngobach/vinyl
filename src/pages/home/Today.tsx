/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FCWithTitle } from '../types';
import Text from '~/components/Text';
import Section from '~/components/Section';

const Today: FCWithTitle = (props) => (
    <section>
        <Section title="Tracks" target={{ href: '/tracks' }}>
            WEOE
        </Section>
    </section>
);

Today.title = 'Listen And Chill';

export default Today;
