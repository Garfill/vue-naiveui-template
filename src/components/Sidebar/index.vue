<template>
  <n-menu
    ref="menuInstRef"
    v-model:value="selectedKey"
    :options="renderOptions"
    :render-label="renderLabel"
    :render-icon="renderIcon"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :collapsed="collapsed"
    inverted></n-menu>
</template>

<script setup name="Sidebar" lang="ts">
  import { MenuOption, MenuInst, NIcon } from 'naive-ui'
  import { RouterLink } from 'vue-router'
  import { BookmarkOutline } from '@vicons/ionicons5'
  import { useSettingStore } from '@/store/modules/setting'

  interface MenuCompProps {
    menuOptions: any[],
    activeKey?: string,
  }
  const props = defineProps<MenuCompProps>()
  const selectedKey = ref<string | null>(null)
  const menuInstRef = ref<MenuInst | null>(null)

  function isOutLink(path: string) {
    return /^https?:\/\/\w+/.test(path)
  }

  function normalizeOption(options: any[], parentPath = '') {
    let res: MenuOption[] = []
    for (let i = 0; i < options.length; i++) {
      let route = options[i]
      if (route.meta?.hidden) continue
      let menuItem: MenuOption = {
        label: route.meta?.title || '空白菜单',
      }
      if (isOutLink(route.path)) {
        menuItem.key = menuItem.path = route.path || route.redirect
      } else {
        menuItem.key = menuItem.path = parentPath + route.path
      }
      if (route.children) {
        let childMenu = normalizeOption(route.children, route.path)
        menuItem.children = childMenu.length ? childMenu : undefined
      }
      res.push(menuItem)
    }
    return res
  }
  const renderOptions = normalizeOption(props.menuOptions)

  function renderLabel(option: MenuOption) {
    if (isOutLink(option.key as string)) {
      return h('a', { href: option.path, target: '_blank' }, option.label as string)
    } else {
      if (option.children?.length) {
        return h('div', null, option.label as string)
      } else {
        return h(RouterLink, { to: option.path as string }, { default: () => option.label })
      }
    }
  }
  function renderIcon() {
    return h(NIcon, null, { default: () => h(BookmarkOutline) })
  }

  function updateMenu(key: string) {
    selectedKey.value = key
    menuInstRef.value?.showOption(key)
  }

  watch(() => props.activeKey, (key) => {
    updateMenu(key || '')
  }, { immediate: true })


  const projectSetting = useSettingStore()
  const collapsed = computed(() => projectSetting.collapsed)
</script>
