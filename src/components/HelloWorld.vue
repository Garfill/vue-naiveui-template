<script setup lang="ts">
  import { ref } from 'vue';
  defineProps<{ msg: string }>();

  const count = ref(0);
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
</template>

<style scoped lang="scss">
.card {
  color: $theme-color;
}
</style>
