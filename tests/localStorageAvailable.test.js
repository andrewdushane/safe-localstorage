import safeLocalStorage from '../src';

describe('localStorage available', () => {
  const storage = {};
  window.localStorage = {
    setItem: (key, value) => {
      storage[key] = value;
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
  test('sets and gets a value', () => {
    safeLocalStorage.set('testKey', 'testValue');
    const testValue = safeLocalStorage.get('testKey');
    expect(testValue).toBe('testValue');
  });
  test('removes an existing value', () => {
    const testValue = safeLocalStorage.get('testKey');
    expect(testValue).toBe('testValue');
    safeLocalStorage.remove('testKey');
    const valueAfterRemoval = safeLocalStorage.get('testKey');
    expect(valueAfterRemoval).toBeNull;
  });
  test('clears all values', () => {
    const testValues = ['a', 'b', 'c', 'd', 'e'];
    testValues.forEach(letter => {
      safeLocalStorage.set(letter, `${letter}${letter}`);
    });
    testValues.forEach(letter => {
      const retrieved = safeLocalStorage.get(letter);
      expect(retrieved).toBe(`${letter}${letter}`);
    });
    safeLocalStorage.removeAll();
    testValues.forEach(letter => {
      const retrieved = safeLocalStorage.get(letter);
      expect(retrieved).toBeNull;
    });
  });
  test("doesn't call the not-available callback", () => {
    const callback = jest.fn();
    safeLocalStorage.set('cb', 'cba', callback);
    const retrieved = safeLocalStorage.get('cb');
    expect(retrieved).toBe('cba');
    expect(callback).toHaveBeenCalledTimes(0);
  });
});
