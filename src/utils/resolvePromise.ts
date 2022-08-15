export function resolve(promise: any): Promise<any[]> {
  return new Promise((res) => {
    promise
      .then((resp: any) => {
        res([null, resp]);
      })
      .catch((error: any) => {
        res([error, {}]);
      });
  });
}