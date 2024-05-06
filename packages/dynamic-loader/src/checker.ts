/**
 * Check if require is available in the current environment.
 *
 * @author Zero <zero@naily.cc>
 * @export
 * @return {boolean}
 */
export function checkRequire(): boolean {
  if (typeof module === 'object' && module.require && typeof module.require === 'function')
    return true

  return false
}

/**
 * Check if import is available in the current environment.
 *
 * @author Zero <zero@naily.cc>
 * @export
 * @return {boolean}
 */
export function checkImport(): boolean {
  try {
    // eslint-disable-next-line no-new-func, no-new
    new Function('import("")')
    return true
  }
  catch (err) {
    return false
  }
}

/**
 * Check if current environment has webpack require function.
 *
 * @author Zero <zero@naily.cc>
 * @export
 * @return {boolean}
 */
export function checkWebpack(): boolean {
  // eslint-disable-next-line ts/ban-ts-comment, ts/prefer-ts-expect-error
  // @ts-ignore
  if (require && require.context && typeof require.context === 'function')
    return true

  return false
}
