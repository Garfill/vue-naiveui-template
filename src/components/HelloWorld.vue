<script setup lang="ts">
  import SvgIcon from './SvgIcon.vue';
  import ViteIcon from '@icon/vite.svg';
</script>

<template>
  <div class="icon-list">
    <div class="icon-item">
      <i class="i-ph-anchor-simple-thin" />
    </div>
    <div class="icon-item">
      <SvgIcon name="vue"></SvgIcon>
    </div>
    <div class="icon-item">
      <vite-icon></vite-icon>
    </div>
  </div>
  <n-button type="success">
    success
  </n-button>
</template>

<style lang="scss" scoped>
  .icon-list {
    font-size: 30px;
  }
</style>