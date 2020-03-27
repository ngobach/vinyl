import { EventEmitter } from 'events';
import { union, fromPairs } from 'lodash';
import { MEDIA_SOURCE } from '@/env';
import { Artist, Genre, Track } from './common';

function urlFor(file: string): string {
  return `${MEDIA_SOURCE}${file}`;
}

class MediaList {
  public tracks: Track[];
  public genres: Genre[];
  public artist: Artist[];

  public async fetch(): Promise<void> {
    (await fetch(urlFor('index.json'))).json().then((items: MediaResponse) => {
      const tracks = new Map<string, Track>();
      const genres = new Map<string, Genre>();
      const artists = new Map<string, Artist>();

      items.forEach((rawTrack) => {
        let artist: Artist = artists.get(rawTrack.artist) || new Artist(rawTrack.artist);
        let genre: Genre = genres.get(rawTrack.genre) || new Genre(rawTrack.genre);
        const t = new Track();
        t.title = rawTrack.title;
        t.artists = [artist];
        t.genres = [genre];
        t.url = urlFor(rawTrack.url);
        artist.tracks.push(t);
        genre.tracks.push(t);
      });

      this.tracks = [...tracks.values()];
      this.artist = [...artists.values()];
      this.genres = [...genres.values()];
    });
  }

  public search(keyword: string): Promise<Track[]> {
    console.log('// TODO:');
    return Promise.resolve([]);
  }
}

export default new MediaList();
