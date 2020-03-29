/* tslint:disable:max-classes-per-file */

export type Cover = string;

export class Track {
  public url: string;
  public title: string;
  public genres: Genre[];
  public cover: Cover;
  public artists: Artist[];
}

interface PlayList {
  tracks: Track[];
  title: string;
}

export class AllItems implements PlayList {
  constructor(
    public title: string,
    public tracks: Track[],
  ) {}
}

export class Genre implements PlayList {
  public title: string;
  public cover: Cover;
  public tracks: Track[] = [];

  constructor (title: string) {
    this.title = title;
  }
}

export class Artist implements PlayList {
  public title: string;
  public cover: Cover;
  public tracks: Track[] = [];

  constructor (title: string) {
    this.title = title;
  }
}

export class SearchResult implements PlayList {
  constructor(
    public title: string,
    public tracks: Track[],
  ) {}
}
