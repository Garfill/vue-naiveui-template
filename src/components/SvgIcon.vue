<template>
  <svg
    aria-hidden="true"
    class="svg-icon-container">
    <use
      :xlink:href="symbolId"
      :fill="color" />
  </svg>
</template>

<script setup lang="ts">
  import {computed} from 'vue';

  interface SvgProps {
    name: string,
    prefix?: string,
    color?: string,
  }
  const props = withDefaults(defineProps<SvgProps>(), {
    prefix: 'icon',
    color: '#333'
  });

  const symbolId = computed(() => {
    return `#${props.prefix}-${props.name}`;
  });

</script>

<style lang="scss" scoped>
.svg-icon-container {
  width: 1em;
  height: 1em;
  vertical-align: -.15em;
}
</style>