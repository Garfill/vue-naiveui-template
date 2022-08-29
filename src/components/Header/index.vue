<script lang="ts" name="Header" setup>
  const headerStyle = {
    color: 'yellow',
    backgroundColor: 'red'
  };
</script>

<template>
  <div class="flex items-center header-container">
    <n-avatar :style="headerStyle">
      A
    </n-avatar>
  </div>
</template>

<style lang="scss" scoped>
  .header-container {
    padding: 8px;
  }
</style>