import React from 'react';

type FCWithTitle<P = unknown> = React.FC<P> & { title: string | ((p: P) => string) };

export { FCWithTitle };
