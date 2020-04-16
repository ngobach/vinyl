interface RawTrack {
  id: string;
  url: string;
  title: string;
  cover: string;
  artists: string[];
  genres: string[];
}

interface Genre {
  id: string;
  name: string;
  cover: string;
}

interface Artist {
  id: string;
  name: string;
  cover: string;
}

interface MediaResponse {
  default_cover: string;
  tracks: {
    [id: string]: RawTrack;
  },
  genres: {
    [id: string]: Genre;
  },
  artists: {
    [id: string]: Artist;
  },
}

interface FakeProcess {
  env: {
    NODE_ENV: string;
  };
}

declare const process: FakeProcess;
declare module '~/assets/img/*';
