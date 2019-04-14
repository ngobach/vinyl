import React from 'react';
import audio from '../../services/audio';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      item: null,
    };

    this.handleItemChanged = this.handleItemChanged.bind(this);
  }

  async componentWillMount() {
    await audio.init();
    this.setState({ loaded: true });
    audio.on('itemChanged', this.handleItemChanged);
    audio.playRandom();
  }

  componentWillUnmount() {
    audio.off('itemChanged', this.handleItemChanged);
  }

  handleItemChanged(newItem) {
    this.setState({ item: newItem });
  }

  render() {
    const { loaded, item } = this.state;
    return (
      loaded ? (
        <div>
          {item && `Playing ${item.title}`}
        </div>
      ) : (
        <div>
          Umm. Loading it
        </div>
      )
    );
  }
}

export default App;
