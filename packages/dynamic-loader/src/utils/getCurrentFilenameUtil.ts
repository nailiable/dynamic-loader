/**
 * Get current filename.
 *
 * @author Zero <zero@naily.cc>
 * @export
 * @return {string}
 */
export function getCurrentFilename(): string {
  if (globalThis.__filename)
    return globalThis.__filename
  else
    return new URL(import.meta.url).pathname
}
