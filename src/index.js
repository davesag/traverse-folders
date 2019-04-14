const fs = require('fs')
const path = require('path')

const { ERROR_BUSY, ERROR_NOT_DIR } = require('./constants')

const DEFAULT_OPTIONS = {
  ignore: 'index.js',
  suffix: '.js'
}

const traverse = (base, processor, options = {}) => {
  const { ignore, suffix } = { ...DEFAULT_OPTIONS, ...options }

  const isJsFile = file =>
    !file.startsWith('.') &&
    !file.endsWith(ignore) &&
    file.slice(-1 * suffix.length) === suffix

  const traversePath = folder => {
    const findFile = file => {
      const folderOrFile = path.join(folder, file)
      try {
        traversePath(folderOrFile)
      } catch (err) {
        /* istanbul ignore if */
        if (
          err.code !== ERROR_NOT_DIR &&
          /* istanbul ignore next */ err.code !== ERROR_BUSY
        )
          throw err
        if (isJsFile(folderOrFile) && typeof processor === 'function')
          processor(folderOrFile)
      }
    }

    fs.readdirSync(folder).forEach(findFile)
  }

  traversePath(base)
}

module.exports = traverse
