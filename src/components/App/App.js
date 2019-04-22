import React from 'react';
import audio from '../../services/audio';
import Head from '../Head';
import Bubble from '../Bubble';
import Player from '../Player';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    };
  }

  componentDidMount() {
    audio.playRandom();
  }

  render() {
    const { opened } = this.state;

    return (
      <div className="app">
        <Head />
        {!opened && (
          <Bubble />
        )}
      </div>
    );
  }
}

export default App;
