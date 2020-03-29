import { BehaviorSubject } from 'rxjs';
import { sample } from 'lodash';
import { Track, PlayList } from './common';

export enum PlaybackMode {
  Single,
  Random,
  Repeat,
};

export interface PlaybackStatus {
  isPlaying: boolean;
}

const audio = createAudio();

export const currentList: BehaviorSubject<PlayList> = new BehaviorSubject(null);
export const currentItem: BehaviorSubject<Track> = new BehaviorSubject(null);
export const currentStatus: BehaviorSubject<PlaybackStatus> = new BehaviorSubject({ isPlaying: false });
export const mode: BehaviorSubject<PlaybackMode> = new BehaviorSubject(PlaybackMode.Single);
export const volume: BehaviorSubject<number> = new BehaviorSubject(0);

function createAudio(): HTMLAudioElement {
  const myAudio = new Audio();
  myAudio.autoplay = false;
  myAudio.addEventListener('play', () => {
    currentStatus.next({
      ...currentStatus.value,
      isPlaying: true,
    });
  });
  myAudio.addEventListener('pause', () => {
    currentStatus.next({
      ...currentStatus.value,
      isPlaying: false,
    });
  });
  return myAudio;
}

function subscribeAll() {
  currentList.subscribe((pl) => {
    if (!pl) {
      return;
    }
    if (mode.value === PlaybackMode.Random) {
      currentItem.next(sample(pl.tracks));
    } else {
      currentItem.next(pl.tracks[0]);
    }
  });

  currentItem.subscribe((track) => {
    if (!track) {
      return;
    }
    audio.src = track.url;
    audio.play();
  });

  volume.subscribe((v) => {
    audio.volume = v;
  });
}

export function playList(list: PlayList): void {
  currentList.next(list);
}

export function playSingle(item: Track): void {
  currentList.next({ title: item.title, tracks: [item] });
}

export function setMode(newMode: PlaybackMode): void {
  mode.next(newMode);
}

export function setVolume(vol: number): void {
  volume.next(vol);
}


// SIDE EFFECTS
subscribeAll();
