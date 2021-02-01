export type Track = {
  id: string;
  url: string;
  title: string;
  genres: PlayList[];
  coverUrl: string;
  artists: PlayList[];
}

export type PlayList = {
  title: string;
  coverUrl: string;
  tracks: Track[];
}

export interface PlaybackStatus {
  duration: number;
  played: number;
  playing: boolean;
}

export type LinkTarget = {
  href?: string;
  onClick?: () => void;
};
