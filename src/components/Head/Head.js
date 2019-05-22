import React from 'react';
import Box from 'ui-box';
import Brand from '../Brand';
import Fly from '../texts/Fly';
import './Head.scss';

class Head extends React.PureComponent {
  render() {
    return (
      <Box className="head">
        <Box className="container">
          <Brand title={this.props.title || 'Vinyl'} />
          <Box flex="1" />
          <Fly fontSize="1rem" href="https://ngobach.com/">@ngobach</Fly>
          <Fly fontSize="1rem">&nbsp;&bull;&nbsp;</Fly>
          <Fly fontSize="1rem" href="https://github.com/ngobach/vinyl">GitHub</Fly>
        </Box>
      </Box>
    );
  }
}

export default Head;
