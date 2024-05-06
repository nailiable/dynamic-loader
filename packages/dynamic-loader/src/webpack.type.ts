import type { WebpackRequireContext } from './type'

declare global {
  interface NodeRequire {
    context: (directory: string, useSubdirectories?: boolean, regExp?: RegExp) => WebpackRequireContext
  }
}

export {}
