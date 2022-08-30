<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup name="AppContainer">
  import { registerLoading } from '@/router/index';

  const loadingBar = useLoadingBar();
  onMounted(() => {
    registerLoading(loadingBar);
    loadingBar.finish();
  });

</script>