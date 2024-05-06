export type CatchReturnType<T, E> = {
  success: true
  data: T
} | {
  success: false
  error: E
}

export type IReturnType<T> = CatchReturnType<T, Error>
