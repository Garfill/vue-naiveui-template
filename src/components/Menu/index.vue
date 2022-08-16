<template>
  <n-menu
    v-model:value="activeKey"
    :options="_menuOptions"></n-menu>
</template>

<script setup name="Menu" lang="ts">
  import type { MenuOption } from 'naive-ui';
  import { RouterLink } from 'vue-router';
  interface MenuCompProps {
    menuOptions: any[],
  }
  const props = defineProps<MenuCompProps>();
  const activeKey = ref<string | null>(null);

  function isOutLink(path: string) {
    return /^https?:\/\/\w+/.test(path);
  }

  function normalizeOption(options: any[]) {
    let res: MenuOption[] = [];
    for (let i = 0; i < options.length; i++) {
      let route = options[i];
      if (route.meta?.hidden) continue;
      let menuItem: MenuOption = {
        key: route.path,
      };
      if (isOutLink(route.path)) {
        menuItem.label = () => h('a', { href: route.path, target: '_blank' }, { default: () => route.name });
      } else {
        menuItem.label = () => h(RouterLink, { to: route.path }, { default: () => route.name });
      }
      if (route.children) {
        menuItem.children = normalizeOption(route.children);
      }
      res.push(menuItem);
    }
    return res;
  }
  const _menuOptions = normalizeOption(props.menuOptions);
</script>
