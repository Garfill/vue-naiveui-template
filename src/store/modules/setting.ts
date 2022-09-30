import { defineStore } from 'pinia'

interface ProjectSetting {
  collapsed: boolean; // 是否已经折叠
  device: string,
}

export const useSettingStore = defineStore('setting', {
  state: (): ProjectSetting => ({
    collapsed: false,
    device: 'pc',
  }),
  actions: {
    setCollapse(status = false) {
      this.collapsed = status
    },
    setDevice(name: string) {
      this.device = name
    }
  }
})