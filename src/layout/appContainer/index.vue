<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup name="AppContainer">
  import { registerLoading } from '@/router/index'
  import { registerMessage } from '@/register/message'

  const loadingBar = useLoadingBar()
  const message = useMessage()
  onMounted(() => {
    registerMessage(message)
    registerLoading(loadingBar)
    loadingBar.finish()
  })

</script>