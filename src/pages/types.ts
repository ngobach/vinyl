import React from "react";

type BaseProps = {
  slotRef?: React.RefObject<HTMLDivElement>;
};

type FCWithTitle<P extends BaseProps = BaseProps> = React.FC<P> & {
  title: string | ((p: P) => string);
};

export { FCWithTitle };
