<script setup lang="ts" name="App">
  import { GlobalThemeOverrides } from 'naive-ui';

  const themeOverrides: GlobalThemeOverrides = {
    // 用于以后全局设置
  };
</script>

<template>
  <div class="app-container">
    <n-config-provider :theme-overrides="themeOverrides">
      <n-message-provider>
        <router-view></router-view>
      </n-message-provider>
    </n-config-provider>
  </div>
</template>
