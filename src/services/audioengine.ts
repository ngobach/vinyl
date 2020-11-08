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
export const volume: BehaviorSubject<number> = new BehaviorSubject(0);

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
  })

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
    if (mode.value === PlaybackMode.Shuffled) {
      currentItem.next(sample(pl.tracks));
    } else {
      currentItem.next(pl.tracks[0]);
    }
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

export function playPlayList(list: PlayList): void {
  currentPlayList.next(list);
}

export function playSingle(item: Track): void {
  currentPlayList.next({ title: item.title, tracks: [item], coverUrl: item.coverUrl });
}

export function setMode(newMode: PlaybackMode): void {
  mode.next(newMode);
}

export function setVolume(vol: number): void {
  volume.next(vol);
}


// SIDE EFFECTS
connect();
