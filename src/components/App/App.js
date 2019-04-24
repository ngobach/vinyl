import React from 'react';
import classnames from 'classnames';
import audio from '../../services/audio';
import Head from '../Head';
import Bubble from '../Bubble';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    };
    this.setOpenState = this.setOpenState.bind(this);
  }

  componentDidMount() {
    audio.playRandom();
  }

  setOpenState(opened) {
    this.setState({ opened });
  }

  render() {
    const { opened } = this.state;

    return (
      <div className={classnames('app', { opened })}>
        <Head />
        <Bubble setOpenState={this.setOpenState} />
      </div>
    );
  }
}

export default App;
