<script setup lang="ts" name="App">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <div class="app-container">
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </div>
</template>
