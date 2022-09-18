import { defineStore } from 'pinia'

interface ProjectSetting {
  collapsed: boolean; // 是否已经折叠
}

export const useSettingStore = defineStore('setting', {
  state: (): ProjectSetting => ({
    collapsed: false,
  }),
  actions: {
    setCollapse(status = false) {
      this.collapsed = status
    }
  }
})