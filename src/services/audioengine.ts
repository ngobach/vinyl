import { BehaviorSubject } from 'rxjs';
import { sample } from 'lodash';
import { DEV } from '~/env';
import log from '~/utils/log';
import { Track, PlayList, PlaybackStatus } from '~/types';

export enum PlaybackMode {
  RepeatOne,
  RepeatAll,
  Shuffled,
}

const audio = createAudio();

export const currentPlayList: BehaviorSubject<PlayList> = new BehaviorSubject(null);
export const currentItem: BehaviorSubject<Track> = new BehaviorSubject(null);
export const currentStatus: BehaviorSubject<PlaybackStatus> = new BehaviorSubject({ playing: false, duration: 0, played: 0 });
export const mode: BehaviorSubject<PlaybackMode> = new BehaviorSubject(PlaybackMode.RepeatOne);
export const volume: BehaviorSubject<number> = new BehaviorSubject(1);

function createAudio(): HTMLAudioElement {
  const myAudio = new Audio();
  myAudio.autoplay = false;
  myAudio.addEventListener('play', () => {
    currentStatus.next({
      ...currentStatus.value,
      playing: true,
    });
  });

  myAudio.addEventListener('pause', () => {
    currentStatus.next({
      ...currentStatus.value,
      playing: false,
    });
  });

  myAudio.addEventListener('progress', () => {
    currentStatus.next({
      ...currentStatus.value,
      duration: myAudio.duration ?? 0,
      played: myAudio.currentTime ?? 0,
    });
  });

  myAudio.addEventListener('ended', () => {
    switch (mode.value) {
      case PlaybackMode.RepeatOne:
        myAudio.currentTime = 0;
        myAudio.play();
        break;
      case PlaybackMode.RepeatAll: {
        const tmp = currentPlayList.value.tracks.concat(currentPlayList.value.tracks);
        currentItem.next(tmp[tmp.indexOf(currentItem.value) + 1]);
        break;
      }
      case PlaybackMode.Shuffled:
        currentItem.next(sample(currentPlayList.value.tracks));
        break;
    }
  });

  if (DEV) {
    Object.assign(window, { _audio: myAudio });
  }

  return myAudio;
}

function connect() {
  currentPlayList.subscribe((pl) => {
    if (!pl) {
      return;
    }
    log(`🎶 %c${pl.title}`, 'font-weight: bold');
    // if (mode.value === PlaybackMode.Shuffled) {
    //   currentItem.next(sample(pl.tracks));
    // } else {
    //   currentItem.next(pl.tracks[0]);
    // }
  });

  currentItem.subscribe((track) => {
    if (!track) {
      return;
    }
    log(`🎵 %c${track.title} - %c${track.artists.map(a => a.title).join(', ')}`, 'font-weight: bold', 'font-weight: normal; color: #888888');
    audio.src = track.url;
    audio.play();
  });

  volume.subscribe((v) => {
    audio.volume = v;
  });
}

export function playPlayList(list: PlayList, track: Track | null): void {
  currentPlayList.next(list);
  if (track) {
    currentItem.next(track);
  }
}

export function playSingle(item: Track): void {
  currentPlayList.next({ title: item.title, tracks: [item], coverUrl: item.coverUrl });
  currentItem.next(item);
}

export function setMode(newMode: PlaybackMode): void {
  mode.next(newMode);
}

export function setVolume(vol: number): void {
  volume.next(vol);
}


// SIDE EFFECTS
connect();
