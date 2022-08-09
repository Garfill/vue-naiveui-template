<script setup lang="ts">
  import { ref } from 'vue';
  import SvgIcon from './SvgIcon.vue';
  defineProps<{ msg: string }>();

  const count = ref(0);
  console.log('import.meta.env', import.meta.env);
</script>

<template>
  <div class="card m-1">
    <div
      type="button"
      class="button"
      @click="() => count++">
      count is {{ count }}
    </div>
    <p>{{ msg }}</p>
  </div>
  <SvgIcon name="vue"></SvgIcon>
</template>

<style scoped lang="scss">
.card {
  color: $theme-color;
}
</style>
