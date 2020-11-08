import { MEDIA_SOURCE } from '~/env';
import { PlayList, Track } from '~/types';
import log from '~/utils/log';

function genUrlForFile(file: string): string {
  return `${MEDIA_SOURCE.replace(/\/$/, '')}/${file.replace(/^\//, '')}`;
}

interface MediaList {
  tracks: Track[];
  genres: PlayList[];
  artists: PlayList[];
  all: PlayList;
  defaultCover: string;

  ensureFetched: () => Promise<MediaList>;
  search: (keyword: string) => Promise<PlayList>;
}

// eslint-disable-next-line
namespace API {
  type Track = {
    id: string;
    url: string;
    title: string;
    cover: string;
    artists: string[];
    genres: string[];
  }
  
  type Genre = {
    id: string;
    name: string;
    cover: string;
  }
  
  type Artist = {
    id: string;
    name: string;
    cover: string;
  }
  
  export interface Response {
    default_cover: string;
    tracks: {
      [id: string]: Track;
    };
    genres: {
      [id: string]: Genre;
    };
    artists: {
      [id: string]: Artist;
    };
  }
}

let fetchPromise: Promise<void> | null = null;

const MediaList = {
  tracks: [],
  genres: [],
  artists: [],
  defaultCover: '',
  all: null,

  async ensureFetched(): Promise<MediaList> {
    if (fetchPromise === null) {
      fetchPromise = (async () => {
        try {
          const mr: API.Response = await (await fetch(
            genUrlForFile('index.json'))).json();
          log('📩 %cResponse received', 'font-weight: bold');
          const genres = new Map<string, PlayList>();
          const artists = new Map<string, PlayList>();
          Object.entries(mr.artists).forEach(([id, raw]) => {
            const artist: PlayList = {
              coverUrl: raw.cover,
              title: raw.name,
              tracks: [],
            };

            artists.set(id, artist);
          });
          Object.entries(mr.genres).forEach(([id, raw]) => {
            const genre: PlayList = {
              coverUrl: raw.cover,
              title: raw.name,
              tracks: [],
            };

            genres.set(id, genre);
          });
          this.tracks = [];
          Object.entries(mr.tracks).forEach(([, raw]) => {
            const track: Track = {
              title: raw.title,
              coverUrl: raw.cover,
              artists: [],
              genres: [],
              url: genUrlForFile(raw.url),
            };
            track.artists = raw.artists.map((i) => {
              const a = artists.get(i);
              a.tracks.push(track);
              return a;
            });
            this.tracks.push(track);
          });
          this.artists = [...artists.values()];
          this.genres = [...genres.values()];
          this.all = {
            title: 'Everything',
            cover: this.defaultCover,
            tracks: this.tracks,
          };
        } catch (error) {
          log(`😱%cCannot fetch media playlists: ${error.message}`,
            'font-weight: bold');
          throw error;
        }
      })();
    }

    await fetchPromise;
    return this;
  },

  // eslint-disable-next-line
  async search(keyword: string): Promise<PlayList> {
    throw new Error('Unimplemented');
  }
}

export default MediaList;
