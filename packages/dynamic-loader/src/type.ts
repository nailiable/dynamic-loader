import type { LoaderImportError, LoaderJitiError, LoaderRequireError, LoaderWebpackError } from './errors'

export enum LoaderType {
  Require,
  Import,
  Jiti,
  Webpack,
}

export interface ICommonLoaderValue<T> {
  type: LoaderType
  id: string
  value: T
}

export interface WebpackRequireContext {
  keys(): string[]
  (id: string): any
  resolve(id: string): string
  id: string
}

export interface IWebpackLoaderValue {
  type: LoaderType.Webpack
  context: WebpackRequireContext
  loadAll: () => Record<string, unknown>
}

export type ILoaderValue<T> = ICommonLoaderValue<T> | IWebpackLoaderValue
export type ILoaderError = LoaderImportError | LoaderJitiError | LoaderRequireError | LoaderWebpackError
