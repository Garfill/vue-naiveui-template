<script setup lang="ts">
  import ViteIcon from '@i/vite.svg';
  import { LogoVue } from '@vicons/ionicons5';
</script>

<template>
  <div class="icon-page-container">
    <div 
      class="flex items-center border-b-1 border-b-dashed icon-item icon-item-vite"
      style="--back: rgba(189, 52, 254, .3)">
      <n-icon size="30">
        <ViteIcon></ViteIcon>
      </n-icon>
      <div class="code">
        <pre>import ViteIcon from '@i/vite.svg';</pre>
        <pre>&lt;ViteIcon /&gt;</pre>
      </div>
    </div>
    <div 
      class="flex items-center border-b-1 border-b-dashed icon-item icon-item-vue"
      style="--back: rgba(51, 54, 57, .3)">
      <n-icon size="30">
        <LogoVue></LogoVue>
      </n-icon>
      <div class="code">
        <pre>import { LogoVue } from '@vicons/ionicons5';</pre>
        <pre>&lt;LogoVue /&gt;</pre>
      </div>
    </div>
    <div 
      class="flex items-center border-b-1 border-b-dashed icon-item icon-item-svg"
      style="--back: rgba(63, 184, 131, .3)">
      <n-icon size="30">
        <SvgIcon name="vue"></SvgIcon>
      </n-icon>
      <div class="code">
        直接使用 &lt;SvgIcon name="icon"/&gt; 组件
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon-item {
  position: relative;
  padding: 16px 0;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translateX(-100%);
    transition: transform ease-out .45s;
    background: var(--back);
  }

  &:hover::before {
    transform: translateX(0);
  }

  &:first-child {
    padding: 0 0 16px;
  }
}

.code {
  margin-left: 16px;
}
</style>