<script setup name="DashboardLayout" lang="ts">
  import Sidebar from '@c/Sidebar/index.vue';
  
  const router = useRouter();
  const menuOptions = JSON.parse(JSON.stringify(router.options.routes));
  const route = useRoute();
  const keyRef = ref(route.fullPath);
</script>

<template>
  <n-layout
    has-sider
    class="app-layout">
    <n-layout-sider class="app-sidebar">
      <Sidebar
        :menu-options="menuOptions"
        :active-key="keyRef">
      </Sidebar>
    </n-layout-sider>
    <n-layout>
      <n-layout-header>
        <n-avatar>G</n-avatar>
      </n-layout-header>
      <n-layout-content class="app-content">
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

    // .app-sidebar {
    //   border-right: 1px solid #ddd;
    // }
    .app-content {
      background: #ddd;
    }
  }
</style>