import { MEDIA_SOURCE } from '~/env';
import { Artist, Genre, Track, SearchResult } from './common';
import log from '~/utils/log';

function urlFor(file: string): string {
  return `${MEDIA_SOURCE}${file}`;
}

export class MediaList {
  public tracks: Track[];
  public genres: Genre[];
  public artist: Artist[];

  public async fetch(): Promise<void> {
    const mr: MediaResponse = await (await fetch(urlFor('index.json'))).json();
    log('📩 %cResponse received', 'font-weight: bold');
    const tracks: Track[] = [];
    const genres = new Map<string, Genre>();
    const artists = new Map<string, Artist>();

    mr.forEach((rawTrack) => {
      const t = new Track();
      t.title = rawTrack.title;
      t.artists = [];
      t.genres = [];
      t.url = urlFor(rawTrack.url);

      const artist: Artist = artists.get(rawTrack.artist) || new Artist(rawTrack.artist);
      artist.tracks.push(t);
      artists.set(artist.title, artist);
      rawTrack.genres.forEach((g) => {
        const genre: Genre = genres.get(g) || new Genre(g);
        genre.tracks.push(t);
        genres.set(genre.title, genre);
      });
      tracks.push(t);
    });

    this.tracks = [...tracks.values()];
    this.artist = [...artists.values()];
    this.genres = [...genres.values()];
  }

  public search(keyword: string): Promise<SearchResult> {
    // TODO:
    return Promise.resolve(null);
  }
}

export default new MediaList();
