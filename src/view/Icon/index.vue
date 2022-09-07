<script setup lang="ts">
  import ViteIcon from '@i/vite.svg'
  import { LogoVue } from '@vicons/ionicons5'

  onMounted(() => {
    let icons = document.querySelectorAll('.icon')
    icons.forEach(icon => {
      useEventListener(icon, 'mouseover', (e) => {
        let codeBlock = icon.querySelector('.code-block') as HTMLElement
        let code = icon.querySelector('.code') as HTMLElement
        if (code) {
          codeBlock.style.setProperty('height', code.getBoundingClientRect().height + 'px')
        }
      })
      useEventListener(icon, 'mouseleave', () => {
        let codeBlock = icon.querySelector('.code-block') as HTMLElement
        let code = icon.querySelector('.code') as HTMLElement
        if (code) {
          codeBlock.style.setProperty('height', '0px')
        }
      })
    })
  })
</script>

<template>
  <div class="icon-page-container">
    <div class="icon shadow">
      <div
        class=" icon-item icon-item-vite"
        style="--back: rgba(189, 52, 254, .3)">
        <n-icon size="30">
          <ViteIcon></ViteIcon>
        </n-icon>
      </div>
      <div class="code-block">
        <div class="code">
          <pre>import ViteIcon from '@i/vite.svg';</pre>
          <pre>&lt;ViteIcon /&gt;</pre>
        </div>
      </div>
    </div>
    <div class="icon shadow">
      <div
        class=" icon-item icon-item-vue"
        style="--back: rgba(51, 54, 57, .3)">
        <n-icon size="30">
          <LogoVue></LogoVue>
        </n-icon>
      </div>
      <div class="code-block">
        <div class="code">
          <pre>import { LogoVue } from '@vicons/ionicons5';</pre>
          <pre>&lt;LogoVue /&gt;</pre>
        </div>
      </div>
    </div>
    <div class="icon shadow">
      <div
        class=" icon-item icon-item-svg"
        style="--back: rgba(63, 184, 131, .3)">
        <n-icon size="30">
          <SvgIcon name="vue"></SvgIcon>
        </n-icon>
      </div>
      <div class="code-block">
        <div class="code">
          直接使用 &lt;SvgIcon name="icon"/&gt; 组件
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .icon {
    margin: 20px 0;
  }
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
.code-block {
  height: 0;
  overflow: hidden;
  transition: height .3s ease-in;
  .code {
    overflow: hidden;
  }
}
</style>