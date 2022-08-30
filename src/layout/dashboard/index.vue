<script setup name="DashboardLayout" lang="ts">
  import Sidebar from '@c/Sidebar/index.vue';
  import Header from '@c/Header/index.vue';
  import { useUserStore } from '@/store/modules/user';

  const userInfo = useUserStore();
  const menuOptions = userInfo.menus;
  const route = useRoute();
  const keyRef = ref(route.fullPath);
</script>

<template>
  <n-layout
    has-sider
    class="app-layout">
    <!-- sidebar -->
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
      <!-- header -->
      <n-layout-header class="shadow">
        <Header></Header>
      </n-layout-header>
      <!-- main-content -->
      <n-layout-content class="app-layout-content">
        <div class="app-content shadow">
          <router-view v-slot="{ Component }">
            <transition
              name="fade"
              mode="out-in">
              <keep-alive>
                <component :is="Component"></component>
              </keep-alive>
            </transition>
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
    background: transparent;
  }

  .app-content {
    margin: 8px;
    padding: 8px;
    border-radius: 4px;
    background: #fff;
  }
}
</style>