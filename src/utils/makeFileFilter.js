const makeFileFilter = (ignore, suffix) => {
  const ignoreFn =
    typeof ignore === 'string'
      ? file => file.endsWith(ignore)
      : ignore instanceof RegExp
      ? file => file.match(ignore) !== null
      : typeof ignore === 'function'
      ? ignore
      : () => false

  const isSuitable = file =>
    !file.startsWith('.') && !ignoreFn(file) && file.slice(-1 * suffix.length) === suffix

  return isSuitable
}

module.exports = makeFileFilter
