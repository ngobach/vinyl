import localForage from "localforage";
import { currentItem } from "./audioengine";

const StorageKey = "history";

const HistoryService = {
  async push(id: string): Promise<void> {
    const current = (await localForage.getItem<string[]>(StorageKey)) || [];
    const filtered = current.filter((item) => item !== id);
    localForage.setItem(StorageKey, [id, ...filtered]);
  },
  async clear(): Promise<void> {
    localForage.setItem(StorageKey, []);
  },
  async get(): Promise<string[]> {
    return localForage.getItem<string[]>(StorageKey);
  },
};

currentItem.subscribe((track) => {
  if (track !== null) {
    HistoryService.push(track.id);
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).test = async () => {
  console.log(await HistoryService.get());
};

export default HistoryService;
