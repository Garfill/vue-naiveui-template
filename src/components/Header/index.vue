<script lang="ts" name="Header" setup>
  import { useUserStore } from '@/store/modules/user'
  import { setToken } from '@/utils/token'
  import { Settings20Regular as Settings } from '@vicons/fluent'
  const options = [
    {
      label: '退出登录',
      key: 'logout',
    }
  ]

  const userInfo = useUserStore()
  function handleSelect(key: string | number) {
    switch (key) {
    case 'logout':
      logout()
      break
    default: 
      break
    }
  }
  
  const router = useRouter()
  function logout() {
    setToken()
    clearUserInfo()
    router.replace('/login')    
  }

  function clearUserInfo() {
    userInfo.setLogin(false)
    userInfo.setMenu([])
  }
</script>

<template>
  <div class="flex items-center header-container">
    <div class="grow flex items-center" />
    <n-dropdown
      trigger="hover"
      :options="options"
      @select="handleSelect">
      <n-avatar>
        {{ userInfo.info?.name }}
      </n-avatar>
    </n-dropdown>
    <n-icon
      size="30"
      class="setting-icon">
      <Settings></Settings>
    </n-icon>
  </div>
</template>

<style lang="scss" scoped>
  .header-container {
    padding: 8px;

    .setting-icon {
      margin: 0 8px;
    }
  }
</style>