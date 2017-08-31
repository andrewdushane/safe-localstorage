# Safe localStorage

## A `window.localStorage` wrapper that will fail gracefully

## Why?

### Safari Private Browsing

In Safari's Private Browsing mode, attempting to store data in localStorage will throw an error. safeLocalStorage checks that `window.localStorage` is safe to use. Added bonus - you can pass its methods an arbitrary callback to be fired if localStorage is unavailable.

### Really old browsers

The localStorage API is available in all modern browsers, [going back to IE 8](https://caniuse.com/#feat=namevalue-storage). Using this library will make you safe in IE 6 and 7.

## Installation

```bash
npm install --save safe-localstorage
```

## Usage

```javascript
import safeLocalStorage from 'safe-localstorage';

safeLocalStorage.set('myKey', 'myValue', () => { console.warn('unable to use localStorage'); })
safeLocalStorage.get('myKey');
```

## API

### `get(key[, onLocalStorageNotAvailable])`

Wrapper for [`localStorage.getItem`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem)

- `key` (**required**): key string at which to get value
- `onLocalStorageNotAvailable` (*optional*): callback to be fired if localStorage is undefined or not safe to use

### `set(key, value[, onLocalStorageNotAvailable])`

Wrapper for [`localStorage.setItem`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem)

- `key` (**required**): key string to update (will be created if it doesn't exist)
- `value` (**required**): string value to be stored at `key`
- `onLocalStorageNotAvailable` (*optional*): callback to be fired if localStorage is undefined or not safe to use

### `remove(key[, onLocalStorageNotAvailable])`

Wrapper for [`localStorage.removeItem`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem)

- `key` (**required**): key string at which to delete the current value
- `onLocalStorageNotAvailable` (*optional*): callback to be fired if localStorage is undefined or not safe to use

### `removeAll([onLocalStorageNotAvailable])`

Wrapper for [`localStorage.clear`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear)

- `onLocalStorageNotAvailable` (*optional*): callback to be fired if localStorage is undefined or not safe to use
