<script setup name="DashboardLayout" lang="ts">
  import Sidebar from '@c/Sidebar/index.vue'
  import Header from '@c/Header/index.vue'
  import { useUserStore } from '@/store/modules/user'
  import { useSettingStore } from '@/store/modules/setting'

  const userInfo = useUserStore()
  const menuOptions = userInfo.menus
  const route = useRoute()
  const keyRef = ref(route.fullPath)

  const projectSetting = useSettingStore()
  const setCollapse = (status: boolean) => {
    projectSetting.setCollapse(status)
  }
  const collapsed = computed(() => projectSetting.collapsed)
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
      :collapsed-width="64"
      collapse-mode="width"
      :collapsed="collapsed"
      :width="240"
      inverted
      @collapse="setCollapse(true)"
      @expand="setCollapse(false)">
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
              name="page-animate"
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
    margin: 16px 8px;
    padding: 8px;
    border-radius: 4px;
    background: #fff;
  }
}
</style>