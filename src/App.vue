<script setup lang="ts" name="App">
  import { zhCN, dateZhCN } from 'naive-ui';

  import { GlobalThemeOverrides } from 'naive-ui';

  const themeOverrides: GlobalThemeOverrides = {
  // 用于全局设置主题颜色
  };
</script>

<template>
  <div class="app-container">
    <n-config-provider
      :theme-overrides="themeOverrides"
      :locale="zhCN"
      :date-locale="dateZhCN">
      <n-message-provider>
        <router-view></router-view>
      </n-message-provider>
    </n-config-provider>
  </div>
</template>
