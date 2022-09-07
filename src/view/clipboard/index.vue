<script lang="ts" setup>
  const copyMsg = ref('Hello World')
</script>

<template>
  <div>
    复制文字：<n-input
      v-model:value="copyMsg"
      class="copy-input"></n-input>
    <n-button
      v-clipboard="copyMsg"
      type="primary">
      点击复制
    </n-button>
  </div>
</template>

<style lang="scss" scoped>
  .copy-input {
    width: 200px;
  }
</style>