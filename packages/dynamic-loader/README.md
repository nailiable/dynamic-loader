<div align="center">

# Dynamic Loader

A cross-platform dynamic library loader for `commonjs`、`es6 module`、`webpack` environment, and Use the `jiti` as fallback.

</div>

## Installation

```bash
pnpm i @nailiable/dynamic-loader
```

## Usage

### Checker

Three functions: `checkRequire`, `checkImport`, `checkWebpack` are provided to check the environment.

For example:

```javascript
import { checkRequire, checkImport, checkWebpack } from '@nailiable/dynamic-loader'

console.log(checkRequire()) // true
console.log(checkImport()) // true
console.log(checkWebpack()) // false
```

### Load

Three functions: `loadRequire`, `loadImport`, `loadWebpack` are provided to load the dynamic library.

For example:

```javascript
import { loadRequire, loadImport, loadWebpack } from '@nailiable/dynamic-loader'

const lib = loadRequire('./lib.js')
console.log(lib)
```

### Auto Load

We have `load` function to auto load the dynamic library, they will fallback to `jiti` if the environment is not supported.

For example:

```javascript
import { load } from '@nailiable/dynamic-loader'

const lib = load('./lib.js')

console.log(lib)
```

## Author

Naily <zero@naily.cc> (https://github.com/nailiable)

## License

MIT
