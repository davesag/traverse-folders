const fs = require('fs')
const path = require('path')

const { DOT, ERROR_BUSY, ERROR_NOT_DIR, JS } = require('./constants')

const traverse = (base, ignore, processor) => {
  const isJsFile = file =>
    !file.startsWith(DOT) &&
    (typeof ignore === 'string' && !file.endsWith(ignore)) &&
    file.slice(-3) === JS

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
