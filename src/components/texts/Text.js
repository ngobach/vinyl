import React from 'react';
import Box from 'ui-box';
import cn from 'classnames';
import './styles.scss';

const Text = function Text({ href, ...props }) {
  const elem = href ? 'a' : 'span';
  return (
    <Box is={elem} href={href} target="_blank" {...props} className={cn(props.cn || false, 'wow-text')} />
  );
};

export default Text;
