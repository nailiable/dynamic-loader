import type { JITIOptions } from 'jiti'
import jiti from 'jiti'
import { LoaderImportError, LoaderRequireError, LoaderWebpackError } from './errors'
import type { ILoaderValue, IWebpackLoaderValue } from './type'
import { LoaderType } from './type'
import { type CatchReturnType, getCurrentFilename } from './utils'
import { LoaderJitiError } from './errors/jitiError'

/**
 * Load a module by require.
 *
 * @author Zero <zero@naily.cc>
 * @export
 * @template T
 * @param {string} id The id of the module.
 * @return {CatchReturnType<ILoaderValue<T>, LoaderRequireError>}
 */
export function loadRequire<T>(id: string): CatchReturnType<ILoaderValue<T>, LoaderRequireError> {
  try {
    // eslint-disable-next-line ts/no-var-requires, ts/no-require-imports
    const value = require(id)
    return {
      success: true,
      data: {
        type: LoaderType.Require,
        id,
        value,
      },
    }
  }
  catch (error) {
    return {
      success: false,
      error: new LoaderRequireError(error.message, id, error),
    }
  }
}

/**
 * Load a module by import.
 *
 * @author Zero <zero@naily.cc>
 * @export
 * @template T
 * @param {string} id The id of the module.
 * @return {Promise<CatchReturnType<ILoaderValue<T>, LoaderImportError>>}
 */
export async function loadImport<T>(id: string): Promise<CatchReturnType<ILoaderValue<T>, LoaderImportError>> {
  try {
    const value = await import(id)
    return {
      success: true,
      data: {
        type: LoaderType.Import,
        id,
        value,
      },
    }
  }
  catch (error) {
    return {
      success: false,
      error: new LoaderImportError(error.message, id, error),
    }
  }
}

/**
 * Load a module by jiti.
 *
 * @author Zero <zero@naily.cc>
 * @export
 * @template T
 * @param {string} id The id of the module.
 * @param {string} [_filename = getCurrentFilename()] The filename of the current module.
 * @return {Promise<CatchReturnType<ILoaderValue<T>, LoaderJitiError>>} The result of the loading.
 */
export async function loadJiti<T>(id: string, _filename: string = getCurrentFilename(), jitiOptions: JITIOptions = {}, parentModule?: typeof module, parentCache?: Record<string, typeof module>): Promise<CatchReturnType<ILoaderValue<T>, LoaderJitiError>> {
  try {
    const value = await jiti(__filename, jitiOptions, parentModule, parentCache)(id)
    return {
      success: true,
      data: {
        type: LoaderType.Jiti,
        id,
        value,
      },
    }
  }
  catch (error) {
    return {
      success: false,
      error: new LoaderJitiError(error.message, id, error),
    }
  }
}

export async function loadWebpack(directory: string, useSubdirectories?: boolean, regExp?: RegExp): Promise<CatchReturnType<IWebpackLoaderValue, LoaderWebpackError>> {
  try {
    // eslint-disable-next-line ts/ban-ts-comment, ts/prefer-ts-expect-error
    // @ts-ignore
    const context = require.context(directory, useSubdirectories, regExp)
    return {
      success: true,
      data: {
        type: LoaderType.Webpack,
        context,
        loadAll: () => {
          const keys = context.keys()
          const result: Record<string, unknown> = {}
          for (const key of keys)
            result[key] = context(key)
          return result
        },
      },
    }
  }
  catch (error) {
    return {
      success: false,
      error: new LoaderWebpackError(error.message, directory, error),
    }
  }
}
