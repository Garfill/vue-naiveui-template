<script setup lang="ts" name="App">
  import AppContainer from '@/layout/appContainer/index.vue'
  import AppProvider from '@/layout/appProvider/index.vue'
</script>

<template>
  <app-provider>
    <app-container></app-container>
  </app-provider>
</template>
