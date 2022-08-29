<script setup name="DashboardLayout" lang="ts">
  import Sidebar from '@c/Sidebar/index.vue';
  import Header from '@c/Header/index.vue';
  import { useUserStore } from '@/store/modules/user';

  const router = useRouter();
  const userInfo = useUserStore();
  const menuOptions = userInfo.menus;
  const route = useRoute();
  const keyRef = ref(route.fullPath);
</script>

<template>
  <n-layout
    has-sider
    class="app-layout">
    <n-layout-sider
      class="app-sidebar"
      show-trigger
      bordered
      collapse-mode="width"
      :width="240"
      :collapsed-width="64"
      inverted>
      <Sidebar
        :menu-options="menuOptions"
        :active-key="keyRef">
      </Sidebar>
    </n-layout-sider>
    <n-layout>
      <n-layout-header class="shadow">
        <Header></Header>
      </n-layout-header>
      <n-layout-content class="app-layout-content">
        <div class="app-content">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component"></component>
            </keep-alive>
          </router-view>
        </div>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style lang="scss" scoped>
.app-layout {
  height: 100vh;

  .app-layout-content {
    padding: 8px;
    background: transparent;
  }

  .app-content {
    padding: 8px;
    border-radius: 4px;
  }
}
</style>