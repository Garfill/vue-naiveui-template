<script setup lang="ts" name="App">
  import { zhCN, dateZhCN } from 'naive-ui'
  import { GlobalThemeOverrides } from 'naive-ui'
  import AppContainer from '@/layout/appContainer/index.vue'

  const themeOverrides: GlobalThemeOverrides = {
  // 用于全局设置主题颜色
  }

</script>

<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN">
    <n-message-provider>
      <n-loading-bar-provider>
        <app-container></app-container>
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>
