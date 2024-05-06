export abstract class AbstractLoaderError extends Error {
  constructor(public readonly message: string, public readonly id: string, public readonly cause: Error) {
    super(message)
    this.name = this.constructor.name
  }
}
