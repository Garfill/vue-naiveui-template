export function debounce(fn: any, delay = 300) {
  let timer: any
  return function(...arg: any) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn.apply(null, ...arg), delay)
  }
}