import React from 'react';

type FCWithTitle<P> = React.FC<P> & { title: string | ((p: P) => string) };

export { FCWithTitle };
