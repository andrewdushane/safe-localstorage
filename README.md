# Safe localStorage

## A `window.localStorage` wrapper that will fail gracefully

## Why?

### Safari Private Browsing

In Safari's Private Browsing mode, attempting to store data in localStorage will throw an error. safeLocalStorage checks that `window.localStorage` is safe to use. Added bonus - you can pass its methods an arbitrary callback to be fired if localStorage is unavaialable.

### Really old browsers

The localStorage API is available in all modern browsers, [going back to IE 8](https://caniuse.com/#feat=namevalue-storage). Using this library will make you safe in IE 6 and 7.

## Installation

```bash
npm install safe-localstorage
```

## Usage

```javascript
import safeLocalStorage from 'safe-localstorage';

safeLocalStorage.set('myKey', 'myValue', () = { console.warn('unable to use localStorage';) });
safeLocalStorage.get('myKey');
```

