import { useClipboard, useEventListener } from '@vueuse/core'
import type { DirectiveBinding } from 'vue'

const cleanupMap = new Map()
const { copy } = useClipboard()

let message: any
export const registerMessage = (msg: any) => {
  message = msg
}

const cleanupElListener = (el: HTMLElement) => {
  const cleanup = cleanupMap.get(el)
  if (cleanup) {
    cleanup()
  }
}
const registerElListener = (el: HTMLElement, value: string) => {
  const cleanup = useEventListener(el, 'click', () => {
    copy(value)
    if (message) {
      message.success('Copy Success!')
    }
  })
  cleanupMap.set(el, cleanup)
}


export default {
  mounted(el: HTMLElement, { value }: DirectiveBinding) {
    registerElListener(el, value)
  },
  updated(el: HTMLElement, { value }: DirectiveBinding) {
    cleanupElListener(el)
    registerElListener(el, value)

  },
  beforeUnmount(el: HTMLElement) {
    cleanupElListener(el)
  },
}