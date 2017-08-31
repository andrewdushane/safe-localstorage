const localStorageAvailable = () => {
  const inWindow =
    typeof window.localStorage === 'object' &&
    typeof window.localStorage.setItem === 'function';
  if (!inWindow) {
    return false;
  }
  // Safari private mode has localStorage in the window, but throws when `setItem` is called
  const key = 'safeLocalStorageTest';
  try {
    window.localStorage.setItem(key, 'succeeds');
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

const noop = () => {};

const useStorageWhenAvailable = (nativeMethod, args, callback = noop) => {
  if (localStorageAvailable()) {
    return window.localStorage[nativeMethod](...args);
  } else {
    callback();
  }
};

const safeLocalStorage = {
  get: (key, onLocalStorageNotAvailable) => {
    return useStorageWhenAvailable('getItem', [key], onLocalStorageNotAvailable);
  },
  set: (key, value, onLocalStorageNotAvailable) => {
    useStorageWhenAvailable('setItem', [key, value], onLocalStorageNotAvailable);
  },
  remove: (key, onLocalStorageNotAvailable) => {
    useStorageWhenAvailable('removeItem', [key], onLocalStorageNotAvailable);
  },
  removeAll: (onLocalStorageNotAvailable) => {
    useStorageWhenAvailable('clear', [], onLocalStorageNotAvailable);
  },
};

export default safeLocalStorage;
