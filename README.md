# traverse-folders

Traverse nested folders and process each of the discovered files.

[![Greenkeeper badge](https://badges.greenkeeper.io/davesag/traverse-folders.svg)](https://greenkeeper.io/)

## Branches

| Branch | Status | Coverage | Notes |
| ------ | ------ | -------- | - |
| `develop` | [![CircleCI](https://circleci.com/gh/davesag/traverse-folders/tree/develop.svg?style=svg)](https://circleci.com/gh/davesag/traverse-folders/tree/develop) | [![codecov](https://codecov.io/gh/davesag/traverse-folders/branch/develop/graph/badge.svg)](https://codecov.io/gh/davesag/traverse-folders) | Work in progress |
| `master` | [![CircleCI](https://circleci.com/gh/davesag/traverse-folders/tree/master.svg?style=svg)](https://circleci.com/gh/davesag/traverse-folders/tree/master) | [![codecov](https://codecov.io/gh/davesag/traverse-folders/branch/master/graph/badge.svg)](https://codecov.io/gh/davesag/traverse-folders) | Latest stable release |

## Prerequisites

This library assumes:

1. You are using NodeJS 8+

## Install

Add `traverse-folders` as a `dependency`:

    npm i traverse-folders

## Examples

A common use of `traverse-folders` is to automatically load a nested hierarchy of functions into an `index.js` file.

### Consolidating API route controllers

For example, let's say you are writing an API server with the following folder hierarchy.

```
src/
  api/
    index.js
    ping.js
    version.js
    /things
      /createThing.js
      /deleteThings.js
      /getThing.js
      /listThings.js
      /updateThings.js
```

In `src/api/index.js` you could put the following:

```
const path = require('path')
const traverse = require('traverse-folders')

const pathSeparator = new RegExp(path.sep, 'g')

const apis = {}
const base = __dirname

const processor = file => {
  const name = file.slice(base.length + 1, -3).replace(pathSeparator, '_')
  apis[name] = require(file)
}

traverse(base, processor)

module.exports = apis
```

Then when `index.js` is first required it will load all the underlying code and expose

```
{
  ping,
  version,
  things_createThing,
  things_deleteThing,
  things_getThing,
  things_getThings,
  things_updateThing,
}
```

with each api correctly linked to the underlying function.

### Making a mockAPI that stays in sync with your real API

Now let's suppose, in your tests, you want to create a mock API that has the same function names, but instead of actually loading the functions, it associates each name with a `stub`

In `test/utils/mockAPI.js` you could write

```
const path = require('path')
const { stub } = require('sinon')
const traverse = require('traverse-folders')

const pathSeparator = new RegExp(path.sep, 'g')

const mockApi = {}
const apiPath = 'src/api'
const processor = file => {
  const name = file.slice(apiPath.length + 1, -3).replace(pathSeparator, '_')
  names[name] = stub()
}

traverse(apiPath, processor)

module.exports = mockApi
```

Now your mockAPI can be used in unit tests in place of the real API, without referencing the real API at all.  This can be important if your API controllers refer to Sequelize models that might trigger an unwanted database connection. (Unit tests must not depend on external services.)

By customising the `processor` function you can use `traverse-folders` to auto-load Sequelize models, ExpressJS middleware, and all manner of other things.

## Options

By default `traverse` will ignore any `index.js` files and only process files ending in `'.js'`. To override this behaviour you can pass an `options` object as the final parameter.

The defaults are:

```
{
  ignore: 'index.js',
  suffix: '.js'
}
```

so `traverse(apiPath, processor, { suffix: '.model.js' })` will ensure that only files ending in `.model.js` get loaded.

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).
