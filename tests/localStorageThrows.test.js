import safeLocalStorage from '../src';

describe('local storage present, but throws', () => {
  const storage = {};
  window.localStorage = {
    setItem: (key, value) => {
      throw new Error('Safari private mode will throw an error when you call setItem');
    },
    getItem: (key) => {
      return storage[key];
    },
    removeItem: (key) => {
      storage[key] = undefined;
    },
    clear: () => {
      Object.keys(storage).forEach(key => {
        storage[key] = undefined;
      });
    },
  };
  test('call directly to local storage throws', () => {
    expect(() => {
      window.localStorage.setItem('this', 'will fail');
    }).toThrow();
  });
  test('safeLocalStorage fails gracefully', () => {
    safeLocalStorage.set('this', 'will not fail');
  });
  test('not-avaialble callback is called', () => {
    const callback = jest.fn();
    safeLocalStorage.set('call', 'back', callback);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
