import { useObservable } from 'react-use';
import { currentItem, currentPlayList, mode, playNext, playPlayList, playSingle, setMode, setVolume, volume } from '~/services/audioengine';

// eslint-disable-next-line
export function useMediaEngine() {
  return {
    currentPlayList: useObservable(currentPlayList, currentPlayList.value),
    currentTrack: useObservable(currentItem, currentItem.value),
    mode: useObservable(mode),
    volume: useObservable(volume, volume.value),
  };
}

// eslint-disable-next-line
export function useMediaController() {
  const engine = useMediaEngine();

  return {
    playPlayList,
    playSingle,
    setVolume,
    setMode,
    next() {
      const tracks = engine.currentPlayList.tracks.concat(currentPlayList.value.tracks);
      const nextTrack = tracks[tracks.indexOf(engine.currentTrack) + 1];
      playNext(nextTrack);
    },
    prev() {
      const tracks = engine.currentPlayList.tracks.concat(currentPlayList.value.tracks);
      const nextTrack = tracks[tracks.lastIndexOf(engine.currentTrack) - 1];
      playNext(nextTrack);
    },
  };
}
