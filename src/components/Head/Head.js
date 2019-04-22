import React from 'react';
import Box from 'ui-box';
import './Head.scss';

class Head extends React.PureComponent {
  render() {
    return (
      <Box className="head">
        <Box className="container">
          <img alt="vinyl" width="64" height="64" src="data:image/png;base64,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" />
          <span className="title">Vinyl</span>
          <Box flex="1" />
          <a className="link" href="https://ngobach.com/" target="_blank" rel="noopener noreferrer">@bachnx</a>
          <Box className="sep">|</Box>
          <a className="link" href="https://github.com/thanbaiks/vinyl" target="_blank" rel="noopener noreferrer">GitHub</a>
        </Box>
      </Box>
    );
  }
}

export default Head;
