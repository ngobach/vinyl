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
    this.mode = MODE_RANDOM;

    // Instantiate our Audio instance
    this.audio = new Audio();
    this.audio.onended = this.handleEnded;
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
        this.rawPlaylist.sort(({ title: a }, { title: b }) => (a < b ? -1 : 1));
        this.rawPlaylist.forEach(({ genres: g }) => gg.push(g));
        this.filter = fromPairs(union(gg).map(s => [s, true]));
        this.emit('loaded');
      });
  }

  handleEnded() {
    if (this.mode === MODE_REPEAT) {
      this.audio.currentTime = 0;
    } else if (this.mode === MODE_RANDOM) {
      this.playItem(sample(this.getFilteredPlaylist()));
    }
  }

  playItem(item) {
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

  getCurrentFilter() {
    return this.filter();
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
