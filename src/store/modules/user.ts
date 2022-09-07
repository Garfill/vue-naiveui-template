import { defineStore } from 'pinia'

interface UserInfo {
  isLogin: boolean,
  menus: any[],
}

export const useUserStore = defineStore('user', {
  state: (): UserInfo => ({
    isLogin: false,
    menus: [],
  }),
  actions: {
    setMenu(menus: any[]) {
      this.menus = menus
    },
    setLogin(state = false) {
      this.isLogin = state
    }
  }
})

export function useUserStoreOutside() {
  return useUserStore()
}