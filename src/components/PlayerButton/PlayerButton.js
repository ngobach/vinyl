import React from 'react';
import Box from 'ui-box';
import { getLoadedAssert } from '../../services/asset-loader';
import './PlayerButton.scss';

class PlayerButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  render() {
    const { icon, ...rest } = this.props;
    const { active } = this.state;
    const iconUrl = getLoadedAssert()[`icon_${icon}`];
    const iconFilledUrl = getLoadedAssert()[`icon_${icon}_filled`];

    return (
      <button
        type="button"
        className="player-button"
        onMouseEnter={() => this.setState({ active: true })}
        onMouseLeave={() => this.setState({ active: false })}
        {...rest}
      >
        <Box
          background={`url(${active ? iconFilledUrl : iconUrl})`}
          className="icon"
        />
      </button>
    );
  }
}

export default PlayerButton;
