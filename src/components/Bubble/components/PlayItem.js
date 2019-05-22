import React from 'react';
import Box from 'ui-box';
import './PlayItem.scss';

const ItemThumbnail = function ItemThumbnail({ url }) {
  return (
    <img className="play-item-thumbnail" alt="thumbnail" src={url} />
  );
};

const ItemTitle = function ItemTitle({ title, artist }) {
  return (
    <div className="play-item-title">
      <div className="big">{title}</div>
      <div className="small">{artist}</div>
    </div>
  );
};

class PlayItem extends React.PureComponent {
  render() {
    return (
      <Box className="play-item" onClick={this.props.onClick}>
        <ItemThumbnail url={this.props.cover} />
        <ItemTitle title={this.props.title} artist={this.props.artist} />
      </Box>
    );
  }
}

export default PlayItem;
