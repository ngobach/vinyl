import React from 'react';
import Box from 'ui-box';
import audio, { MODE_RANDOM, MODE_REPEAT } from '../../services/audio';
import './Player.scss';
import PlayerButton from '../PlayerButton';

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

class Player extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      title: '',
      artist: '',
      progress: 0,
      volume: 0,
      duration: 0,
      mode: MODE_RANDOM,
      isPlaying: false,
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handlePlayState = this.handlePlayState.bind(this);
  }

  componentWillMount() {
    audio.on('itemChanged', this.handleUpdate);
    audio.on('progress', this.handleProgress);
    audio.on('playState', this.handlePlayState);
  }

  componentDidMount() {
    audio.playRandom();
  }

  componentWillUnmount() {
    audio.off('itemChanged', this.handleUpdate);
    audio.off('progress', this.handleProgress);
    audio.off('playState', this.handlePlayState);
  }

  handleUpdate(item) {
    this.setState({
      title: item.title,
      artist: item.artist,
    });
  }

  handleProgress(progress, duration) {
    if (!Number.isNaN(progress) && !Number.isNaN(duration)) {
      this.setState({ progress, duration });
    }
  }

  handlePlayState(isPlaying) {
    this.setState({ isPlaying });
  }

  render() {
    const {
      title,
      artist,
      progress,
      volume,
      duration,
      mode,
      isPlaying,
    } = this.state;
    const progressLeft = formatSeconds(duration * progress);
    const progressRight = formatSeconds(duration);

    return (
      <div className="player">
        <div className="box">
          <Box height="8px" />
          <div className="current">
            <p className="title">{title}</p>
            <div className="subtitle">{artist}</div>
            <div className="timeline">
              <div>{progressLeft}</div>
              <Box flex="1" />
              <div>{progressRight}</div>
            </div>
            <div className="process-holder">
              <Box className="progress" width={`${progress * 100}%`} />
            </div>
          </div>
          <div className="controls">
            <PlayerButton icon={`repeat`} />
            <PlayerButton icon={`audio_${volume}`} />
            <PlayerButton icon={isPlaying ? 'pause' : 'play'} onClick={() => audio.togglePlay()} />
            <PlayerButton icon="next" onClick={() => audio.playRandom()} />
            <PlayerButton icon={`repeat`} />
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
