export function resolve<T>(promise: Promise<T> | undefined): Promise<any> {
  if (promise === undefined) {
    return Promise.resolve()
  }
  return new Promise((res) => {
    promise
      .then((resp: T) => {
        res([null, resp])
      })
      .catch((error: any) => {
        res([error, {}])
      })
  })
}