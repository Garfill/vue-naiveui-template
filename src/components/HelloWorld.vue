<script setup lang="ts">
  import _ from 'lodash';
  import { ref } from 'vue';
  import SvgIcon from './SvgIcon.vue';
  defineProps<{ msg: string }>();

  const count = ref(0);

  const addCount = _.throttle(() => {
    count.value++;
  }, 1000, {
    trailing: false,
  });
</script>

<template>
  <div class="card m-1">
    <div
      type="button"
      class="button"
      @click="addCount">
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
