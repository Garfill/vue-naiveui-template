<template>
  <n-menu
    ref="menuInstRef"
    v-model:value="selectedKey"
    :options="renderOptions"
    :render-label="renderLabel"></n-menu>
</template>

<script setup name="Sidebar" lang="ts">
  import { MenuOption, MenuInst } from 'naive-ui';
  import { RouterLink } from 'vue-router';
  interface MenuCompProps {
    menuOptions: any[],
    activeKey?: string,

  }
  const props = defineProps<MenuCompProps>();
  const selectedKey = ref<string | null>(null);
  const menuInstRef = ref<MenuInst | null>(null);

  function isOutLink(path: string) {
    return /^https?:\/\/\w+/.test(path);
  }

  function normalizeOption(options: any[], parentPath = '') {
    let res: MenuOption[] = [];
    for (let i = 0; i < options.length; i++) {
      let route = options[i];
      if (route.meta?.hidden) continue;
      let menuItem: MenuOption = {
        label: route.name || 'EmptyMenu',
      };
      if (isOutLink(route.path)) {
        menuItem.key = menuItem.path = route.path;
      } else {
        menuItem.key = menuItem.path = parentPath + route.path;
      }
      if (route.children) {
        let childMenu = normalizeOption(route.children, route.path);
        menuItem.children = childMenu.length ? childMenu : undefined;
      }
      res.push(menuItem);
    }
    return res;
  }
  const renderOptions = normalizeOption(props.menuOptions);

  function renderLabel(option: MenuOption) {
    if (isOutLink(option.key as string)) {
      return h('a', { href: option.path, target: '_blank' }, option.label as string);
    } else {
      return h(RouterLink, { to: option.path as string }, { default: () => option.label });
    }
  }

  onMounted(() => {
    if (props.activeKey) {
      selectedKey.value = props.activeKey;
      menuInstRef.value?.showOption(props.activeKey);
    }
  });

</script>
