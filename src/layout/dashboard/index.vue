<script setup name="DashboardLayout" lang="ts">
import Sidebar from '@c/Sidebar/index.vue'
import Header from '@c/Header/index.vue'
import { useUserStore } from '@/store/modules/user'
import { useSettingStore } from '@/store/modules/setting'
import { debounce } from '@/utils'
import { WidthSetting } from '@/setting/width'

const userInfo = useUserStore()
const menuOptions = userInfo.menus
const route = useRoute()
const keyRef = ref(route.fullPath)

const projectSetting = useSettingStore()
const setCollapse = (status: boolean) => {
  projectSetting.setCollapse(status)
}
const collapsed = computed(() => projectSetting.collapsed)

// 监听页面大小变化
function resizeHandler() {
  const innerWidth = window.innerWidth
  if (innerWidth < WidthSetting.pc) {
    // 小尺寸pc屏幕
    setCollapse(true)
  } else {
    // 大尺寸屏幕
    setCollapse(false)
  }
}
const debounceResizeHandler = debounce(resizeHandler, 200)
useEventListener(window, 'resize', debounceResizeHandler)
onMounted(() => {
  resizeHandler()
})
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
      <n-layout-header
        class="shadow app-layout-header"
        position="absolute">
        <Header></Header>
      </n-layout-header>
      <!-- main -->
      <n-layout-content class="shadow app-layout-content">
        <div class="app-content">
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

  &-header {
    z-index: 100;
  }

  &-content {
    --navbar-height: 60px;
    margin-top: var(--navbar-height);
    height: calc(100vh - var(--navbar-height));
    background: transparent;
  }

  .app-content {
    margin: 8px;
    border-radius: 4px;
    background: #fff;
  }
}
</style>