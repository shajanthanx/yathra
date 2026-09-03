/* eslint-env jest */

// In-memory AsyncStorage so storage tests exercise the real repository code
// without touching a device.
jest.mock('@react-native-async-storage/async-storage', () => {
  let store = new Map();
  return {
    __esModule: true,
    default: {
      getItem: jest.fn((key) => Promise.resolve(store.has(key) ? store.get(key) : null)),
      setItem: jest.fn((key, value) => {
        store.set(key, String(value));
        return Promise.resolve();
      }),
      removeItem: jest.fn((key) => {
        store.delete(key);
        return Promise.resolve();
      }),
      getAllKeys: jest.fn(() => Promise.resolve([...store.keys()])),
      multiRemove: jest.fn((keys) => {
        keys.forEach((k) => store.delete(k));
        return Promise.resolve();
      }),
      clear: jest.fn(() => {
        store = new Map();
        return Promise.resolve();
      }),
      __reset: () => {
        store = new Map();
      },
    },
  };
});

jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageCode: 'en', languageTag: 'en-LK', regionCode: 'LK' }],
}));

// Icon fonts resolve asynchronously, which produces act() warnings that say
// nothing about the app. Treat them as already loaded in tests.
jest.mock('expo-font', () => ({
  ...jest.requireActual('expo-font'),
  isLoaded: () => true,
  loadAsync: () => Promise.resolve(),
  useFonts: () => [true, null],
}));
