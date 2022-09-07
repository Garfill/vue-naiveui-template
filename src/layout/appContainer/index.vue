<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup name="AppContainer">
  import { registerLoading } from '@/router/index'
  import { registerMessage } from '@/directive/clipboard/index'

  const loadingBar = useLoadingBar()
  const message = useMessage()
  onMounted(() => {
    registerLoading(loadingBar)
    registerMessage(message)
    loadingBar.finish()
  })

</script>