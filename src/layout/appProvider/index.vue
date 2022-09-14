<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN">
    <n-message-provider>
      <n-loading-bar-provider>
        <slot />
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
  import { zhCN, dateZhCN } from 'naive-ui'
  import { GlobalThemeOverrides } from 'naive-ui'
  const themeOverrides: GlobalThemeOverrides = {
  // 用于全局设置主题颜色
  }
</script>