import { FC } from 'react';

export type FCWithTitle<P = {}> = FC<P> & { title: string };
