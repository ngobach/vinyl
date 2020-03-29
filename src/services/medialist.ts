import { MEDIA_SOURCE } from '~/env';
import { Artist, Genre, Track, SearchResult, GenericList, PlayList } from './common';
import log from '~/utils/log';

function urlFor(file: string): string {
  return `${MEDIA_SOURCE}${file}`;
}

export class MediaList {
  public tracks: Track[];
  public genres: Genre[];
  public artist: Artist[];
  public all: PlayList;

  public async fetch(): Promise<void> {
    try {
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
        t.artists.push(artist);
        artists.set(artist.title, artist);
        rawTrack.genres.forEach((g) => {
          const genre: Genre = genres.get(g) || new Genre(g);
          genre.tracks.push(t);
          t.genres.push(genre);
          genres.set(genre.title, genre);
        });
        tracks.push(t);
      });

      this.tracks = [...tracks.values()];
      this.artist = [...artists.values()];
      this.genres = [...genres.values()];
      this.all = new GenericList('My tracks', this.tracks);
    } catch (error) {
      log(`😱%cCannot fetch media playlists: ${error.message}`, 'font-weight: bold');
      throw error;
    }
  }

  public search(keyword: string): Promise<SearchResult> {
    // TODO:
    return Promise.resolve(null);
  }
}

export default new MediaList();
