import safeLocalStorage from '../src';

describe('local storage not in the global window', () => {
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
