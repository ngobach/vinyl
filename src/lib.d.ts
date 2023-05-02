interface FakeProcess {
  env: {
    NODE_ENV: string;
    APP_REVISION: string | undefined;
  };
}

declare const process: FakeProcess;

declare module "*.png" {
  const url: string;
  export default url;
}

declare module "*.svg" {
  const url: string;
  export default url;
}

declare module "excuses" {
  type Excuses = {
    developers: {
      getAll: () => void;
      getRandom: () => void;
    };
  };
  const excuses: Excuses;

  export default excuses;
}

declare module "tieng-viet-khong-dau" {
  type TVKD = {
    c(s: string): string;
  };

  const TVKD: TVKD;
  export default TVKD;
}
