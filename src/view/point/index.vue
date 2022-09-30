<script lant="ts" setup>
import { FullScreenMaximize16Regular, FullScreenMinimize24Filled } from '@vicons/fluent'


const isFull = ref(false)
const playgroundRef = ref(null)
function handleFullScreen() {
  if (!playgroundRef) return
  if (!isFull.value) {
    playgroundRef.value.requestFullscreen().then(() => {
      isFull.value = true
    })
  } else {
    document.exitFullscreen().then(() => {
      isFull.value = false
    })
  }
}
</script>

<template>
  <div class="point-page">
    <h3>
      模仿
      <a
        class="underline"
        href="https://www.jetbrains.com/fleet/">Fleet</a> 的官网光标跟踪效果 (v-point 指令)
    </h3>
    <div
      ref="playgroundRef"
      v-point
      class="point-container flex align-items justify-center">
      <div class="point-desc">
        鼠标放上来~
      </div>
      <n-tooltip trigger="hover">
        点击全屏
        <template #trigger>
          <n-icon
            size="30"
            class="full-page-icon"
            @click="handleFullScreen">
            <FullScreenMinimize24Filled v-show="isFull"></FullScreenMinimize24Filled>
            <FullScreenMaximize16Regular v-show="!isFull"></FullScreenMaximize16Regular>
          </n-icon>
        </template>
      </n-tooltip>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.point {
  &-page {
    height: 600px;
  }

  &-container {
    position: relative;
    height: 500px;
    border: 1px solid #ddd
  }
}

.full-page-icon {
  position: absolute;
  right: 10px;
  bottom: 10px;
  cursor: pointer;
}
</style>