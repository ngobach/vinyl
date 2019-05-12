import React from 'react';
import Box from 'ui-box';
import classNames from 'classnames';
import audio, { MODE_RANDOM, MODE_REPEAT } from '../../services/audio';
import './Bubble.scss';

function autoPrefix(s) {
  const str = String(s);
  if (str.length < 2) {
    return `0${str}`;
  }
  return str;
}

function formatSeconds(s) {
  if (Number.isNaN(s)) {
    return '00:00';
  }

  const tmp = Math.trunc(s);
  return `${autoPrefix(Math.trunc(tmp / 60))}:${autoPrefix(tmp % 60)}`;
}

const VOLUME_LEVELS = 3;

class Bubble extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      item: audio.current,
      isPlaying: false,
      progress: 0,
      duration: 0,
      mode: MODE_RANDOM,
      volumeLevel: VOLUME_LEVELS,
    };

    this.handleItemChanged = this.handleItemChanged.bind(this);
    this.handlePlayingStateChanged = this.handlePlayingStateChanged.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
  }

  componentWillMount() {
    audio.on('itemChanged', this.handleItemChanged);
    audio.on('playState', this.handlePlayingStateChanged);
    audio.on('progress', this.handleProgress);
    audio.setMode(MODE_RANDOM);
    audio.setVolume(this.state.volumeLevel / VOLUME_LEVELS);
  }

  componentWillUnmount() {
    audio.off('itemChanged', this.handleItemChanged);
    audio.off('playState', this.handlePlayingStateChanged);
    audio.off('progress', this.handleProgress);
  }

  handleItemChanged(item) {
    this.setState({ item });
  }

  handlePlayingStateChanged(isPlaying) {
    this.setState({ isPlaying });
  }

  togglePlayMode() {
    const { mode } = this.state;
    const newMode = mode === MODE_RANDOM ? MODE_REPEAT : MODE_RANDOM;
    this.setState({
      mode: newMode,
    });
    audio.setMode(newMode);
  }

  changeVolume() {
    const { volumeLevel } = this.state;
    const newVolumeLevel = (volumeLevel + 1) % (VOLUME_LEVELS + 1);
    this.setState({ volumeLevel: newVolumeLevel });
    audio.setVolume(newVolumeLevel / VOLUME_LEVELS);
  }

  handleProgress(progress, duration) {
    if (!Number.isNaN(progress) && !Number.isNaN(duration)) {
      this.setState({ progress, duration });
    }
  }

  render() {
    const {
      item, isPlaying, progress, duration, mode, volumeLevel,
    } = this.state;
    const { toggleOpen } = this.props;
    const progressLeft = formatSeconds(duration * progress); // eslint-disable-line
    const progressRight = formatSeconds(duration); // eslint-disable-line
    const filter = Object.entries(audio.getCurrentFilter());

    return (
      <Box className="bubble-container">
        <Box className="bubble">
          <Box className="now-playing">
            <Box className="left">
              <Box className="cover">
                <img src={(item && item.cover) || ''} alt="thumbnail" onClick={() => toggleOpen()} />
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
              <Box className="controllers">
                <Box className="button" onClick={() => audio.togglePlay()}><i className={`im im-${isPlaying ? 'pause' : 'play'}`} /></Box>
                <Box className="button" onClick={() => audio.playRandom()}><i className="im im-next" /></Box>
                <Box className="progress">
                  <Box className="progress-value" width={`${progress * 100}%`} />
                </Box>
                <Box className="button" onClick={() => this.togglePlayMode()}><i className={`im im-${mode === MODE_REPEAT ? 'loop' : 'random'}`} /></Box>
                <Box className="button" onClick={() => this.changeVolume()}><i className={`im im-volume${volumeLevel ? '' : '-off'}`} /></Box>
              </Box>
            </Box>
          </Box>
          <Box className="playlist">
            <Box className="sidebar">
              <Box className="caption">Genres</Box>
              {filter.map(([name, active]) => (
                <Box className={classNames('item', { active })} onClick={() => this.toggleFilter(name)}>{name}</Box>
              ))}
            </Box>
            <Box className="picker">
              {audio.getFilteredPlaylist().map(it => (
                <Box className="item">
                  {it.title}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Bubble;
