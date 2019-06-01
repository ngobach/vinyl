import { EventEmitter } from 'events';
import {
  sample,
  union,
  fromPairs,
  difference,
} from 'lodash';

const BASE_URL = 'http://minio.ngobach.com/musik/';

const getUrlOf = function getUrlOf(file) {
  return `${BASE_URL}${file}`;
};

const MODE_REPEAT = 'REPEAT';
const MODE_RANDOM = 'RANDOM';

class AudioService extends EventEmitter {
  constructor() {
    super();
    this.rawPlaylist = null;
    this.filter = {};
    this.handleEnded = this.handleEnded.bind(this);
    this.handleDurationChanged = this.handleDurationChanged.bind(this);
    this.handleTimeChanged = this.handleTimeChanged.bind(this);
    this.mode = MODE_RANDOM;
    this.current = null;

    // Instantiate our Audio instance
    this.audio = new Audio();
    this.audio.addEventListener('ended', this.handleEnded);
    this.audio.addEventListener('durationchange', this.handleDurationChanged);
    this.audio.addEventListener('timeupdate', this.handleTimeChanged);
    this.audio.addEventListener('pause', this.handlePlayState.bind(this, false));
    this.audio.addEventListener('play', this.handlePlayState.bind(this, true));
  }

  init() {
    if (this.rawPlaylist !== null) {
      // Alright, it's already been there
      return Promise.resolve();
    }

    // Must fetch from remote
    console.log('%cPrepare your anus :)', 'color: #800; font-weight: bold');
    return fetch(getUrlOf('index.json'))
      .then(resp => resp.json())
      .then((data) => {
        const gg = [];
        this.rawPlaylist = data;
        this.rawPlaylist.sort(({ title: a }, { title: b }) => a.localeCompare(b));
        this.rawPlaylist.forEach(({ genres: g }) => gg.push(...g));
        this.filter = fromPairs(union(gg).map(s => [s, true]));
        this.emit('loaded');
      });
  }

  handleEnded() {
    if (this.mode === MODE_REPEAT) {
      this.audio.currentTime = 0;
      this.audio.play();
    } else if (this.mode === MODE_RANDOM) {
      this.playItem(sample(this.getFilteredPlaylist()));
    }
  }

  handleDurationChanged() {
    this.emit('progress', 0, this.audio.duration);
  }

  handleTimeChanged() {
    this.emit('progress', this.audio.currentTime / this.audio.duration, this.audio.duration);
  }

  handlePlayState(isPlaying) {
    this.emit('playState', isPlaying);
  }

  playItem(item) {
    this.current = item;
    this.audio.src = getUrlOf(item.url);
    console.log(`🎧 %c${item.title}%c - %c${item.artist}`, 'font-weight: 900', 'font-weight: inherit', 'color: #AAA');
    this.emit('itemChanged', item);
    return this.audio.play().catch((error) => {
      console.log('%cUnable to play item: %s', 'color: #800; font-weight: bold', error.message);
    });
  }

  playRandom() {
    this.playItem(sample(this.getFilteredPlaylist()));
  }

  togglePlay() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  // YAGNI???
  clearFilter() {
    Object.keys(this.filter).forEach((k) => {
      this.filter[k] = true;
    });
  }

  setFilter(newFilter) {
    const ours = Object.keys(this.filter);
    const theirs = Object.keys(newFilter);
    if (difference(ours, theirs).length) {
      throw new Error('New filter is invalid');
    }
    this.filter = newFilter();
    this.emit('filterChanged', newFilter);
  }

  setMode(mode) {
    this.mode = mode;
    console.log(`Mode now is %c${mode}`, 'font-weight: bold');
  }

  setVolume(volume) {
    this.audio.volume = volume;
  }

  getCurrentFilter() {
    return this.filter;
  }

  getPlaylist() {
    return this.rawPlaylist;
  }

  getFilteredPlaylist() {
    return this.rawPlaylist.filter(item => item.genres.some(g => this.filter[g]));
  }
}

export default new AudioService();
export { MODE_REPEAT, MODE_RANDOM };
