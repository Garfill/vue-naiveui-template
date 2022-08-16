<script setup name="DashboardLayout" lang="ts">
  import Menu from '@c/Menu/index.vue';
  
  const router = useRouter();
  const menuOptions = JSON.parse(JSON.stringify(router.options.routes));
</script>

<template>
  <n-layout
    has-sider
    class="app-layout">
    <n-layout-sider>
      <Menu :menu-options="menuOptions"></Menu>
    </n-layout-sider>
    <n-layout>
      <n-layout-header>
        <n-avatar>G</n-avatar>
      </n-layout-header>
      <n-layout-content class="app-layout-content">
        <router-view v-slot="{Component}">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style lang="scss" scoped>
  .app-layout {
    height: 100vh;

    &-content {
      background: #ddd;
    }
  }
</style>