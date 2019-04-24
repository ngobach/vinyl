import React from 'react';
import Box from 'ui-box';
import audio from '../../services/audio';
import './Bubble.scss';

class Bubble extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      item: audio.current,
      isPlaying: false,
    };

    this.handleItemChanged = this.handleItemChanged.bind(this);
    this.handlePlayingStateChanged = this.handlePlayingStateChanged.bind(this);
  }

  componentWillMount() {
    audio.on('itemChanged', this.handleItemChanged);
    audio.on('playState', this.handlePlayingStateChanged);
  }

  componentWillUnmount() {
    audio.off('itemChanged', this.handleItemChanged);
    audio.off('playState', this.handlePlayingStateChanged);
  }

  handleItemChanged(item) {
    this.setState({ item });
  }

  handlePlayingStateChanged(isPlaying) {
    this.setState({ isPlaying });
  }

  render() {
    const { item, isPlaying } = this.state;
    const { setOpenState } = this.props;

    return (
      <Box className="bubble-container">
        <Box className="bubble">
          <Box className="now-playing">
            <Box>
              <Box className="cover">
                <img src={(item && item.cover) || ''} alt="thumbnail" onClick={() => setOpenState(true)} />
              </Box>
              <Box className="controllers">
                <Box className="button" paddingTop="2px" paddingLeft="8px" onClick={() => audio.togglePlay()}><i className={`im im-${isPlaying ? 'pause' : 'play'}`} /></Box>
                <Box className="button" paddingTop="2px" onClick={() => audio.playRandom()}><i className="im im-next" /></Box>
              </Box>
            </Box>
            <Box className="info">
              <Box className="first-line">NOW PLAYING</Box>
              <Box>
                <Box className="title">{(item && item.title) || ''}</Box>
                <Box className="subtitle">{(item && item.artist) || ''}</Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Bubble;
