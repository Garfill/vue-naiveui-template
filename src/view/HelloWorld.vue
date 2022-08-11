<script lang="ts" setup>
  interface Props {
    msg?: string,
  }
  withDefaults(defineProps<Props>(), {
    msg: 'hello world'
  });
</script>

<template>
  <n-button type="success">
    {{ msg }}
  </n-button>
</template>