import React from 'react';
import Helmet from 'react-helmet';
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
      title: null,
    };
    this.toggleOpen = this.toggleOpen.bind(this);
    this.onItemChanged = this.onItemChanged.bind(this);
    audio.on('itemChanged', this.onItemChanged);
  }


  componentDidMount() {
    audio.playRandom();
  }

  onItemChanged(item) {
    this.setState({
      title: `${item.title} - ${item.artist}`,
    });
  }

  toggleOpen() {
    this.setState({ opened: !this.state.opened });
  }

  render() {
    const { opened } = this.state;

    return (
      <div className={classnames('app', { opened })}>
        <Helmet>
          <title>{this.state.title}</title>
        </Helmet>
        <Head />
        <Bubble opened={opened} toggleOpen={this.toggleOpen} />
      </div>
    );
  }
}

export default App;
