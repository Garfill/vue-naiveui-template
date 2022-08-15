<template>
  <router-link to="/login">
    {{ msg }}
  </router-link>
</template>

<script setup name="Dashboard">
  const msg = ref('去登录');
</script>