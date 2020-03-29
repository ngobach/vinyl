interface RawTrack {
  url: string;
  title: string;
  artist: string;
  cover: string;
  genres: string[];
}

type MediaResponse = RawTrack[];

interface FakeProcess {
  env: {
    NODE_ENV: string;
  };
}

declare const process: FakeProcess;
