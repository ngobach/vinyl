/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useEffect } from 'react';
import { FunctionComponent } from 'react';
import { useMedialist } from '~/hooks';
import { useActivePlaylist, usePlayList } from '~/hooks/audioengine';

const MediaPlayer: FunctionComponent<{}> = () => {
  const ml = useMedialist();
  const activePlaylist = useActivePlaylist();
  const playList = usePlayList();

  useEffect(() => {
    playList(ml.all);
  }, []);

  return (
    <div>
      {activePlaylist ? activePlaylist.title : 'null'}
    </div>
  );
};

export default MediaPlayer;
