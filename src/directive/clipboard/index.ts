import { useClipboard, useEventListener } from '@vueuse/core'
import type { DirectiveBinding } from 'vue'
import { message } from '@/register/message'

const cleanupMap = new Map()
const { copy } = useClipboard()

const cleanupElListener = (el: HTMLElement) => {
  const cleanup = cleanupMap.get(el)
  if (cleanup) {
    cleanup()
  }
}
const registerElListener = (el: HTMLElement, value: string) => {
  const cleanup = useEventListener(el, 'click', () => {
    copy(value)
    message && message.success('Copy Success!')
  })
  cleanupMap.set(el, cleanup)
}
const removeEl = (el: HTMLElement) => {
  if (cleanupMap.has(el)) {
    cleanupMap.delete(el)
  }
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
    removeEl(el)
  },
}