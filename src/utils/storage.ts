import { LocalStorage, LocalStorageKeys, LocalStorageOptions } from "../types";

export function setStoredCities(cities: string[]): Promise<void> {
  const values: LocalStorage = {
    cities,
  };

  return new Promise((resolve) => {
    chrome.storage.sync.set(values, () => {
      resolve();
    });
  });
}

export function getStoredCities(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ["cities"];

  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (res: LocalStorage) => {
      console.log(res.cities);
      resolve(res.cities ?? []);
    });
  });
}

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const values: LocalStorage = {
    options,
  };

  return new Promise((resolve) => {
    chrome.storage.sync.set(values, () => {
      resolve();
    });
  });
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ["options"];

  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (res: LocalStorage) => {
      resolve(res.options);
    });
  });
}
