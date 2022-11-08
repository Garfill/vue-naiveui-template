import { defineStore } from 'pinia'

interface Info {
  id: number;
  name: string;
  [prop: string]: any
}

interface UserInfo {
  isLogin: boolean;
  menus: any[];
  info: Info;
}

export const useUserStore = defineStore('user', {
  state: (): UserInfo => ({
    info: {} as Info,
    isLogin: false,
    menus: [],
  }),
  actions: {
    setMenu(menus: any[]) {
      this.menus = menus
    },
    setLogin(state = false) {
      this.isLogin = state
    },
    setUserInfo(info: Info) {
      this.info = info || {}
    }
  }
})

export function useUserStoreOutside() {
  return useUserStore()
}