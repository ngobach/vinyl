/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useEffect } from 'react';
import { FunctionComponent } from 'react';
import useMediaList from '~/hooks/use-medialist';
import { useActivePlaylist, usePlayList } from '~/hooks/audioengine';

const MediaPlayer: FunctionComponent<{}> = () => {
  const ml = useMediaList();
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
