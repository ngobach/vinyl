export type Track = {
  url: string;
  title: string;
  coverUrl: string;
  artist: string;
};

export type PlayList = {
  title: string;
  coverUrl: string;
  tracks: Track[];
};

export interface PlaybackStatus {
  duration: number;
  played: number;
  playing: boolean;
}

export type LinkTarget = {
  href?: string;
  onClick?: () => void;
};
