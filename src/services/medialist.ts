import { MEDIA_SOURCE } from '~/env';
import {
  Artist,
  GenericList,
  Genre,
  PlayList,
  SearchResult,
  Track,
} from '~/types';
import log from '~/utils/log';

function urlFor(file: string): string {
  return `${MEDIA_SOURCE.replace(/\/$/, '')}/${file.replace(/^\//, '')}`;
}

export class MediaList {
  public tracks: Track[];
  public genres: Genre[];
  public artists: Artist[];
  public all: PlayList;

  public async fetch(): Promise<void> {
    try {
      const mr: MediaResponse = await (await fetch(
        urlFor('index.json'))).json();
      log('📩 %cResponse received', 'font-weight: bold');
      const genres = new Map<string, Genre>();
      const artists = new Map<string, Artist>();
      Object.entries(mr.artists).forEach(([id, raw]) => {
        const a = new Artist(raw.name);
        a.cover = raw.cover;
        artists.set(id, a);
      });
      Object.entries(mr.genres).forEach(([id, raw]) => {
        const g = new Genre(raw.name);
        g.cover = raw.cover;
        genres.set(id, g);
      });
      this.tracks = [];
      Object.entries(mr.tracks).forEach(([id, raw]) => {
        const t = new Track();
        t.cover = raw.cover;
        t.title = raw.title;
        t.url = raw.url;
        t.artists = raw.artists.map((i) => {
          const a = artists.get(i);
          a.tracks.push(t);
          return a;
        });
        this.tracks.push(t);
      });
      this.artists = [...artists.values()];
      this.genres = [...genres.values()];
      this.all = new GenericList('My tracks', this.tracks, mr.default_cover);
    } catch (error) {
      log(`😱%cCannot fetch media playlists: ${error.message}`,
        'font-weight: bold');
      throw error;
    }
  }

  public search(keyword: string): Promise<SearchResult> {
    // TODO:
    return Promise.resolve(null);
  }
}

export default new MediaList();
