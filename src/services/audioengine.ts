import { BehaviorSubject } from 'rxjs';
import { sample } from 'lodash';
import { Track } from './common';

export enum PlaybackMode {
  Single,
  Random,
  Repeat,
};

export interface PlaybackStatus {
  isPlaying: boolean;
}

const audio = createAudio();

export const currentList: BehaviorSubject<Track[]> = new BehaviorSubject([]);
export const currentItem: BehaviorSubject<Track> = new BehaviorSubject(null);
export const currentStatus: BehaviorSubject<PlaybackStatus> = new BehaviorSubject({ isPlaying: false });
export const mode: BehaviorSubject<PlaybackMode> = new BehaviorSubject(PlaybackMode.Single);
export const volume: BehaviorSubject<number> = new BehaviorSubject(0);

function createAudio(): HTMLAudioElement {
  const audio = new Audio();
  audio.autoplay = false;
  audio.addEventListener('play', () => {
    currentStatus.next({
      ...currentStatus.value,
      isPlaying: true,
    });
  });
  audio.addEventListener('pause', () => {
    currentStatus.next({
      ...currentStatus.value,
      isPlaying: false,
    });
  });
  return audio;
}

function subscribeAll() {
  currentList.subscribe((tracks: Track[]) => {
    if (tracks.length === 0) {
      return;
    }
    if (mode.value === PlaybackMode.Random) {
      currentItem.next(sample(tracks));
    } else {
      currentItem.next(tracks[0]);
    }
  });

  currentItem.subscribe((track) => {
    audio.src = track.url;
    audio.play();
  });

  volume.subscribe((v) => {
    audio.volume = v;
  });
}

export function playList(items: Track[]): void {
  currentList.next(items);
}

export function playSingle(item: Track): void {
  currentList.next([item]);
}

export function changeMode(newMode: PlaybackMode): void {
  mode.next(newMode);
}

export function changeVolume(vol: number): void {
  volume.next(vol);
}

subscribeAll();
